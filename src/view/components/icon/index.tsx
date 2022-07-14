import { FC, Fragment } from "react";
import api from '@/api'
export interface TextProps {
  title: string;
}

const workbench: FC<TextProps> = (props) => {
  return (
    <Fragment>
      <div className="bg-white dark:bg-gray-800">
        ICON
      </div>

    </Fragment>
  );
};
export default workbench