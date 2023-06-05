import { ReactNode } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Loader } from "./Loader/Loader";
import { InfoMessage } from "../InfoMessage/InfoMessage";

interface IMetaConditionalRenderProps{
  children: ReactNode;
  isLoading: boolean;
  error?: string;
  isEmpty?: boolean;
  emptyMessage?: string;
  loaderSize?: number;
}
export function MetaConditionalRender({children, isLoading, error, isEmpty, emptyMessage='', loaderSize=40}: IMetaConditionalRenderProps) {
  if (isLoading) return <Loader size={loaderSize} center />;
  if (error) return <ErrorMessage message={error} />;
  if (isEmpty) return <InfoMessage message={emptyMessage} />
  return <>{children}</>;
}