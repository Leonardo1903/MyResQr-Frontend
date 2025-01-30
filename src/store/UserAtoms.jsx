import { atom } from "recoil";

export const accessTokenAtom = atom({
  key: "accessTokenAtom",
  default: "",
});

export const refresh_tokenAtom = atom({
  key: "refresh_tokenAtom",
  default: "",
});

export const isUserExistingAtom = atom({
  key: "isUserExistingAtom",
  default: false,
})

export const idAtom = atom({
  key: "idAtom",
  default: "",
});

export const phoneNumberAtom = atom({
  key: "phoneNumberAtom",
  default: "",
});

export const emailAtom = atom({
  key: "emailAtom",
  default: "",
});

export const genderAtom = atom({
  key: "genderAtom",
  default: "",
});

export const trace_idAtom = atom({
  key: "trace_idAtom",
  default: "",
});

export const profileIdAtom = atom({
  key: "profileIdAtom",
  default: "",
});

export const roleAtom = atom({
  key: "roleAtom",
  default: "",
});

export const pinAtom = atom({
  key: "pinAtom",
  default: "",
});

export const userDashboardDataAtom = atom({
  key: "userDashboardDataAtom",
  default: {
    id: null,
    emergency_contact: [],
    medical_detail: [
      {
        blood_group: "",
        blood_donor: "",
        blood_pressure: "",
        diabetes: "",
        cholesterol: "",
        heart_related: "",
        disabled: "",
        reason_disabled: "",
        asthma: "",
        tuberculosis: "",
        mental_illness: "",
        epilepsy: "",
        nsaids: "",
        steroids: "",
        anticogulant: "",
        surgery_history: "",
        organ_implant: "",
        medications: "",
        other_medical_condition: "",
        allergies: "",
        additonal_info: "",
      },
    ],
    mobile_number: "",
    first_name: "",
    last_name: "",
    email_id: "",
    whatsapp_number: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pin_code: "",
    country: "",
    image: "",
  },
});

export const postScanPinAtom = atom({
  key: "postScanPinAtom",
  default: "",
});

export const saviourDetailsAtom = atom({
  key: "saviourDetailsAtom",
  default: {
    fullName: "",
    phoneNumber: "",
    pinNumber: "",
    latitude: "",
    longitude: "",
  },
});
