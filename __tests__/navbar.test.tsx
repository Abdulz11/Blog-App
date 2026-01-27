import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "@/components/Navbar/navbar";
import userEvent from "@testing-library/user-event";
import { UserContext } from "@/context/userProviderWrapper";

import { signIn, signOut } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("../src/components/dropDown", () => () => <h1>dropdown</h1>);

const navComponent = (session?: { user: string }) => {
  render(
    <UserContext.Provider value={{ session }}>
      <Navbar />
    </UserContext.Provider>
  );
};

test("sign out button shows when logged in", () => {
  (signIn as jest.Mock).mockReturnValue({ user: "john" });
  const session = { user: "john" };
  navComponent(session);

  const button = screen.getByRole("button", { name: /log out/i });
  expect(button).toBeInTheDocument();
});

test("sign in button shows when logged out", async () => {
  navComponent();
  const button = screen.queryByRole("button", { name: /log out/i });
  const logInButton = screen.getByRole("button", { name: /log in/i });
  expect(button).not.toBeInTheDocument();
  expect(logInButton).toBeInTheDocument();

  await userEvent.click(logInButton);
  expect(signIn).toHaveBeenCalledTimes(1);
});
