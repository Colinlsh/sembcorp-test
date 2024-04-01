import * as Yup from "yup";

export const InvoiceSchema = Yup.object().shape({
  invoiceNumber: Yup.string().required("Invoice number is required"),
  customer: Yup.string().required("Customer name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date().required("Date is required"),
  dueDate: Yup.date().required("Due date is required"),
  issueDate: Yup.date().required("Issue date is required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        // Assuming your InvoiceItemModel has fields like 'description', 'quantity', and 'price'
        description: Yup.string().required("Description is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .min(1, "Quantity must be at least 1"),
        price: Yup.number()
          .required("Price is required")
          .min(0, "Price must be greater than or equal to 0"),
      })
    )
    .required("At least one item is required"),
  total: Yup.number()
    .required("Total is required")
    .min(0, "Total must be greater than or equal to 0"),
  status: Yup.string().required("Status is required"),
});
