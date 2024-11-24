import { atom } from "recoil";

export const accessTokenAtom = atom({
    key: "accessTokenAtom",
    default: "",
})

export const refresh_tokenAtom = atom({
    key : "refresh_tokenAtom",
    default: "",
})

export const idAtom = atom({
    key : "idAtom",
    default : "",
})

export const phoneNumberAtom = atom({
    key : "phoneNumberAtom",
    default : "",
})

export const emailAtom = atom ({
    key : "emailAtom",
    default : "",
})

export const trace_idAtom = atom({
    key : "trace_idAtom",
    default : "",
})