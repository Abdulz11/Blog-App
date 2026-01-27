import Blogs from "@/app/blog/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { fetchPosts } from "@/lib/db/data";

const posts = [
  {
    author: "abdul",
    title: "my life",
    body: "this life is not easy",
    userEmail: "abdul@gmail",
    _id: "123",
    createdAt: "12-03-23",
    updatedAt: "12-03-23",
  },
  {
    author: "doug",
    title: "my after life",
    body: "i hope my after life is  easy",
    userEmail: "doug@gmail",
    _id: "1234",
    createdAt: "13-03-23",
    updatedAt: "13-03-23",
  },
];

jest.mock("../src/lib/auth", () => ({
  auth: () =>
    jest.fn().mockReturnValue(
      Promise.resolve({
        user: { name: "doug", email: "doug@gmail.com" },
      })
    ),
}));

jest.mock("../src/lib/db/data", () => ({
  fetchUser: jest
    .fn()
    .mockReturnValue(
      Promise.resolve([{ name: "same", email: "sam@gmail.com" }])
    ),
  fetchPosts: jest.fn(),
}));

test("if no posts exists,show just an h1", async () => {
  const blogComponent = await Blogs();
  render(blogComponent);
  (fetchPosts as jest.Mock).mockReturnValue(posts);

  const h1 = screen.getByRole("heading", { name: /no posts/i });
  const image = screen.queryByRole("img");

  expect(h1).toBeInTheDocument();
  expect(image).not.toBeInTheDocument();
});

test("blog posts rendered on screen", async () => {
  const blogComponent = await Blogs();
  render(blogComponent);

  const link = screen.getAllByRole("link", { name: /Go to post by/i });
  const image = screen.getAllByRole("img", { name: /post image/i });
  const paragraph = screen.getAllByRole("paragraph");
  const readMoreLink = screen.getAllByRole("link", { name: /read more/i });

  expect(link).toHaveLength(2);
  expect(image).toHaveLength(2);
  expect(readMoreLink).toHaveLength(2);

  expect(link[0]).toHaveAttribute("href", `/blog/${posts[0]._id}`);
});
