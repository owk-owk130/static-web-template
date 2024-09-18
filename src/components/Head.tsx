import { PropsWithChildren } from "react";
import { Helmet } from "react-helmet-async";

export const Head = ({ children }: PropsWithChildren) => {
  return <Helmet>{children}</Helmet>;
};
