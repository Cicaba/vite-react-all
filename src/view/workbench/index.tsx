import {FC, Fragment} from "react";

export interface TextProps {
  title: string;
}

const workbench: FC<TextProps> = (props) => {
  return (
    <Fragment>
      <div className="bg-white dark:bg-gray-800">
        工作台
      </div>
    </Fragment>
  );
};
export default workbench
