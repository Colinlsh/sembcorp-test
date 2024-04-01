// import { Formik, Field, Form, FieldArray } from "formik";
// import { InvoiceSchema } from "../../app/validation/schemas";

// const InvoiceForm = () => {
//   return (
//     <div className="h-full w-full flex flex-col ">
//       <Formik
//         initialValues={{
//           invoiceNumber: "",
//           customer: "",
//           email: "",
//           date: "",
//           dueDate: "",
//           issueDate: "",
//           items: [{ description: "", quantity: 1, price: 0 }],
//           total: 0,
//           status: "",
//         }}
//         validationSchema={InvoiceSchema}
//         onSubmit={(values, { setSubmitting }) => {
//           // Handle form submission
//           console.log(values);
//           setSubmitting(false);
//         }}
//       >
//         {({ values, handleSubmit, isSubmitting }) => (
//           <Form onSubmit={handleSubmit}>
// <div className="flex w-full h-full items-center">
//   <div className="flex w-full h-full">
//     <div className="flex w-1/5">
//       <div className="flex flex-col justify-between h-full w-full gap-y-2">
//         <div className="flex items-center justify-start p-1">
//           Invoice Number:
//         </div>
//         <div className="flex items-center justify-start p-1">
//           Customer:
//         </div>
//         <div className="flex items-center justify-start p-1">
//           Email:
//         </div>
//       </div>
//     </div>
//     <div className="flex flex-col w-4/5 justify-between gap-y-2">
//       <div className="flex items-center justify-center h-full p-1">
//         Fetching...
//       </div>
//       <div className="flex items-center justify-center h-full">
//         <Field
//           id="customer"
//           name="customer"
//           className="block w-full rounded-md border py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-5"
//         />
//       </div>
//       <div className="flex items-center justify-center h-full">
//         <Field
//           id="email"
//           name="email"
//           className="block w-full rounded-md border py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-5"
//         />
//       </div>
//     </div>
//   </div>
// </div>

//             {/* Add labels for date, dueDate, and issueDate in similar fashion */}
//             <FieldArray
//               name="items"
//               render={(arrayHelpers) => (
//                 <div className="flex flex-col p-1">
//                   {values.items.map((_, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center h-full space-x-2 mt-2"
//                     >
//                       <label htmlFor={`items.${index}.description`}>
//                         Description
//                       </label>
//                       <Field
//                         as="textarea"
//                         id={`items.${index}.description`}
//                         name={`items.${index}.description`}
//                         className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
//                       />
//                       <label htmlFor={`items.${index}.quantity`}>
//                         Quantity
//                       </label>
//                       <Field
//                         id={`items.${index}.quantity`}
//                         name={`items.${index}.quantity`}
//                         type="number"
//                         className="w-[20%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
//                       />
//                       <label htmlFor={`items.${index}.price`}>Price</label>
//                       <Field
//                         id={`items.${index}.price`}
//                         name={`items.${index}.price`}
//                         type="number"
//                         className="w-[20%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => arrayHelpers.remove(index)}
//                         className="text-red-500 p-1 w-20"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                   <div className="my-2 flex w-full h-full justify-center items-center">
//                     <button
//                       type="button"
//                       onClick={() =>
//                         arrayHelpers.push({
//                           description: "",
//                           quantity: 1,
//                           price: 0,
//                         })
//                       }
//                       className="text-black p-1 w-fit items-center justify-center flex border-1 rounded-3xl hover:bg-green-500"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                         className="w-3 h-3"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M12 4.5v15m7.5-7.5h-15"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             />
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
//             >
//               Submit
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default InvoiceForm;

import { useFormik } from "formik";
import { InvoiceSchema } from "../../app/validation/schemas";

const InvoiceForm = () => {
  const formik = useFormik({
    initialValues: {
      invoiceNumber: "",
      customer: "",
      email: "",
      date: "",
      dueDate: "",
      issueDate: "",
      items: [{ description: "", quantity: 1, price: 0 }],
      total: 0,
      status: "",
    },
    validationSchema: InvoiceSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex">
          <div className="flex flex-col justify-between h-full w-1/5 gap-y-2">
            <div className="flex items-center justify-start p-1">
              Invoice Number:
            </div>
            <div className="flex items-center justify-start p-1">Customer:</div>
            <div className="flex items-center justify-start p-1">Email:</div>
          </div>
          <div className="flex flex-col w-4/5 justify-between gap-y-2">
            <div className="flex items-center justify-center h-full p-1">
              Fetching...
            </div>
            <div className="flex items-center justify-center h-full">
              <input
                id="customer"
                name="customer"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.customer}
                className="block w-full rounded-md border py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-5"
              />
            </div>
            <div className="flex items-center justify-center h-full">
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="block w-full rounded-md border py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-5"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-1 h-full justify-end">
          {formik.values.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center h-full space-x-2 mt-2"
            >
              <label htmlFor={`items.${index}.description`}>Description</label>
              <textarea
                id={`items.${index}.description`}
                name={`items.${index}.description`}
                onChange={formik.handleChange}
                value={item.description}
                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
              />
              <label htmlFor={`items.${index}.quantity`}>Quantity</label>
              <input
                id={`items.${index}.quantity`}
                name={`items.${index}.quantity`}
                type="number"
                onChange={formik.handleChange}
                value={item.quantity}
                className="w-[20%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
              />
              <label htmlFor={`items.${index}.price`}>Price</label>
              <input
                id={`items.${index}.price`}
                name={`items.${index}.price`}
                type="number"
                onChange={formik.handleChange}
                value={item.price}
                className="w-[20%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
              />
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue(
                    "items",
                    formik.values.items.filter((_, i) => i !== index)
                  )
                }
                className="text-red-500 p-1 w-20"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="my-2 flex w-full h-full justify-center items-center">
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue(
                  "items",
                  formik.values.items.concat([
                    { description: "", quantity: 1, price: 0 },
                  ])
                )
              }
              className="text-black p-1 w-fit items-center justify-center flex border-1 rounded-3xl hover:bg-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Submit
      </button>
    </div>
  );
};

export default InvoiceForm;
