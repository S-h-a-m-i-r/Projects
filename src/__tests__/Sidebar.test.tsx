import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar, { Menu } from "components/Sidebar";
import CircleStarIcon from "icons/CircleStarIcon";

const menus: Menu[] = [
  {
    title: "Create Kpi",
    icon: CircleStarIcon,
  },
];

// Render complete sidebar
test("render sidebar", () => {
  render(<Sidebar menus={menus} />);

  const drawer = screen.getByTestId("drawer");
  expect(drawer).toBeVisible();
});

// Render logo on sidebar
test("render logo on sidebar", () => {
  render(<Sidebar menus={menus} />);
  const logo = screen.getByAltText(/teo-logo/i);
  expect(logo).toBeInTheDocument();
});

test("render sidebar menus", () => {
  render(<Sidebar menus={menus} />);

  const menuItems = screen.getAllByTestId("menuItem");
  expect(menuItems[0]).toHaveTextContent(menus[0].title);
});

test("menu selected item to have background color", () => {
  render(<Sidebar menus={menus} />);

  const menuButtons = screen.getAllByTestId("menuButton");

  fireEvent.click(menuButtons[0]);
  expect(menuButtons[0]).toHaveClass("Mui-selected");
});
