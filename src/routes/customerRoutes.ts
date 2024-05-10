import * as CustomerController from "../controller/CustomerController";
export const customerRoutes = [
  {
    method: "POST",
    path: "/{id}/customers",
    handler: CustomerController.createCustomerHandler,
  },
  {
    method: "GET",
    path: "/customers",
    handler: CustomerController.getCustomerHandler,
  },
];
