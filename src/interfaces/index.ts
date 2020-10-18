import { match } from "react-router-dom";

export interface IField {
    [name: string]: string
}

export interface IMatchParams {
    type: string;
    id: string;
}

export interface IMatch extends match {
    params: IMatchParams;
}