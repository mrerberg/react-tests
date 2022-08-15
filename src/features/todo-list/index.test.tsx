import React from "react";
import { BASE_API_URL } from "../../services/constants";
import { setupApiStore } from "../../test-utils";
import { TodoList } from "./index";
import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { todoApi } from "../../services/todo";

export const handlers = [
   rest.get(`${BASE_API_URL}/todos`, (req, res, ctx) => {
        return res(
          ctx.json([{ completed: false, id: "1", title: "First todo" }])
        );
      }),
];

const server = setupServer(...handlers);

const storeRef = setupApiStore(todoApi);

describe("TodoList feature", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it("should show todos list", async () => {
    server.use(
      rest.get(`${BASE_API_URL}/todos`, (req, res, ctx) => {
        return res(
          ctx.json([{ completed: false, id: "1", title: "First todo" }])
        );
      })
    );

    render(<TodoList />, { wrapper: storeRef.wrapper });

    screen.getByText("Loading...");

    expect(await screen.findByText("First todo")).toBeInTheDocument();
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });

  it("should show error block if request failed", async () => {
    server.use(
      rest.get(`${BASE_API_URL}/todos`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<TodoList />, { wrapper: storeRef.wrapper });

    expect(
      await screen.findByText("Oops, some error just happened")
    ).toBeInTheDocument();
  });

  it("should update todo item by click", async () => {
    server.use(
      rest.put(`${BASE_API_URL}/todos/1`, (req, res, ctx) => {
        return res(ctx.json({ completed: true }));
      })
    );

      render(<TodoList />, { wrapper: storeRef.wrapper });

    fireEvent.click(await screen.findByText("First todo"));

    server.use(
      rest.get(`${BASE_API_URL}/todos`, (req, res, ctx) => {
        return res(
          ctx.json([{ completed: true, id: "1", title: "First todo" }])
        );
      })
    );

    expect(await screen.findByText("👌")).toBeInTheDocument();
  });

  it("should create todo item", async () => {
    const newItem = { completed: false, id: "2", title: "Second todo" };

    server.use(
      rest.post(`${BASE_API_URL}/todos`, (req, res, ctx) => {
        return res(ctx.json(newItem));
      })
    );

    render(<TodoList />, { wrapper: storeRef.wrapper });

    fireEvent.change(
      await screen.findByPlaceholderText("Enter todo title..."),
      { target: { value: newItem.title } }
    );

    fireEvent.click(screen.getByText("Add todo"));

    server.use(
      rest.get(`${BASE_API_URL}/todos`, (req, res, ctx) => {
        return res(
          ctx.json([
            { completed: false, id: "1", title: "First todo" },
            newItem,
          ])
        );
      })
    );

    expect(await screen.findByText(newItem.title)).toBeInTheDocument();
  });
});
