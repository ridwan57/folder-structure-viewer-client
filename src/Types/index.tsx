export type objType = [
    {
        id: string,
        name: string,
        children: string[],
        parent: string,
    }
]
export type objResType = {
    data: [
        {
            id: string,
            name: string,
            children: string[],
            parent: string,
        }
    ]
}
export type singleObjType = {
    id: string,
    name: string,
    children: string[],
    parent: string,
}
export type singleResObjType =
    {
        data: {
            id: string,
            name: string,
            children: string[],
            parent: string,
        }
    }

export interface ModalProps {
    id: string,
    // onChange(name: string): number;
    handleModalFolder(id: string, name: string): void,
    handleModalDelete(id: string): void,
    closeModal(): void,
    filename: string,
    deleteModal: boolean,
    // onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}