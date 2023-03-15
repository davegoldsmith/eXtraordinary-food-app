import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./footer";

describe("<Footer/>", () => {
  test("renders the copyright owner", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const titleElement = screen.getByText(/extraordinary Websites Inc/i);
    expect(titleElement).toBeInTheDocument();
  });
});