import {
    fireEvent,
    render,
    screen,
    waitForElementToBeRemoved,
  } from "@testing-library/vue";
  import userEvent from '@testing-library/user-event';
  import { rest } from "msw";
  import { setupServer } from "msw/node";
  import App from "../../App.vue";
  import "@testing-library/jest-dom";
  
  // The same URL is used when we call Supabase createClient in App.jsx,
  // which makes us intercept the right URL in MSW
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  
  // Mock todos rows response
  const todos = [{ id: 1, name: "Do laundry" }];
  
  const server = setupServer(
    rest.all(`${SUPABASE_URL}/rest/v1/todos`, async (req, res, ctx) => {
      switch (req.method) {
        case "GET":
            console.log("GET!");
          return res(ctx.json("handled"));
        case "POST":
            console.log("POST!");
            return
        default:
            console.log("DEFAULT!");
          return res(ctx.json("Unhandled method"));
      }
    })
  );
  
  // Ideally you'd move this to a setupTests file
  beforeAll(() => server.listen({
    onUnhandledRequest: 'warn',
  }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  test("fetches and displays Todos", async () => {
    render(App);
    //await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    const button = screen.getByRole('button', {name: 'Add todo' });
    await userEvent.click(button);
    expect(await screen.findByText(todos[0].name)).toBeInTheDocument();
  });