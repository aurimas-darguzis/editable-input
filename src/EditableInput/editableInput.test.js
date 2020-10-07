import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import EditableInput from ".";

test("on first render user see non-editable field", () => {
  const { getByText, getByTestId } = render(<EditableInput />);
  const spanElement = getByText(/Hello World/i);
  const nonEditableElement = getByTestId("editable-false");
  expect(spanElement).toBeInTheDocument();
  expect(nonEditableElement).toBeInTheDocument();
});

test("clicking on static text will make it editable", () => {
  const { getByTestId } = render(<EditableInput />);
  const nonEditableElement = getByTestId("editable-false");
  fireEvent.click(nonEditableElement);
  const editableElement = getByTestId("editable-true");
  expect(editableElement).toBeInTheDocument();
});

test("clicking out of the field will confirm the change", async () => {
  const { getByTestId, getByText } = render(<EditableInput />);
  const nonEditableElement = getByTestId("editable-false");
  fireEvent.click(nonEditableElement);

  const editableElement = getByTestId("editable-true");

  fireEvent.change(editableElement, {
    target: { value: "Thanks for all the fish" },
  });
  expect(editableElement.value).toBe("Thanks for all the fish");

  fireEvent.click(document.body);

  await waitForElementToBeRemoved(() => getByTestId("loading-logo"));

  await waitFor(() => {
    expect(nonEditableElement).toBeTruthy();
    expect(getByTestId("success-logo")).toBeInTheDocument();
    const spanElement = getByText(/Thanks for all the fish/i);
    expect(spanElement).toBeInTheDocument();
  });
});

test("Pressing Enter on editable field will confirm the change", async () => {
  const { getByTestId, getByText } = render(<EditableInput />);
  const nonEditableElement = getByTestId("editable-false");

  fireEvent.click(nonEditableElement);

  const editableElement = getByTestId("editable-true");

  fireEvent.change(editableElement, {
    target: { value: "Thanks for all the fish" },
  });

  fireEvent.keyDown(editableElement, { key: "Enter", code: "Enter" });

  await waitForElementToBeRemoved(() => getByTestId("loading-logo"));

  await waitFor(() => {
    expect(nonEditableElement).toBeTruthy();
    expect(getByTestId("success-logo")).toBeInTheDocument();
    const spanElement = getByText(/Thanks for all the fish/i);
    expect(spanElement).toBeInTheDocument();
  });
});

xtest("on error a message will be displayed", async () => {
  const { getByTestId, getByText } = render(<EditableInput />);
  const nonEditableElement = getByTestId("editable-false");
  fireEvent.click(nonEditableElement);
  const editableElement = getByTestId("editable-true");

  fireEvent.change(editableElement, {
    target: { value: "Thanks for all the fish" },
  });

  fireEvent.keyDown(editableElement, { key: "Enter", code: "Enter" });

  // mock error response from promise

  await waitFor(() => {
    expect(getByTestId("error-message-container")).toBeInTheDocument();
    expect(getByTestId("error-logo")).toBeInTheDocument();
    const errorSpanElement = getByText(
      /Oops! Something has gone terribly wrong/i
    );
    expect(errorSpanElement).toBeInTheDocument();
  });
});
