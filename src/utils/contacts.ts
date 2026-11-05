import contactsData from "../content/contacts.json"

export interface PhoneContact {
  number: string
  tel: string
  primary?: boolean
  note?: string
}

export interface ContactsData {
  email: string
  phones: PhoneContact[]
}

export function getContacts(): ContactsData {
  return contactsData as ContactsData
}

export function getPrimaryPhone(): PhoneContact {
  const primary = contactsData.phones.find((p) => p.primary)
  return primary ?? contactsData.phones[0]
}
