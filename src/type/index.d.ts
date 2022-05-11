export { }
declare global {
    interface IResponse<T = any> {
        msg?: string;
        success: Boolean;
        code: number;
        data: T;
    }
    interface IObject<T> {
        [index: string]: T
    }
    interface IAny {
        [x: string]: any
    }
    interface IRNode {
        [key: string]: React.ReactNode;
    }
    interface ITable<T = any> {
        data: Array<T>
        total: number
    }
    interface ImportMetaEnv {
        VITE_APP_TITLE: string
        VITE_PORT: number;
        VITE_PROXY: string;
    }
    /**
     * @description react-redux分发
     * @author Cicaba
     * @date 21/04/2022
     * @interface IConnect
     * @template T
     */
    interface IConnect<T> {
        common: T,
        router: T,
        local: T,
    }
}