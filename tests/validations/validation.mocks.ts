export const account_obj = {
    account_id: 1,
    currency: 'USD',
    balance: 5300,
    status_id: 1,
    a_date: "2022-02-13T17:09:42.000Z",
    e_date: "2022-02-14T05:07:19.000Z"
}

export const account_for_unique = [
    {
      account_id: 9,
      currency: 'USD',
      balance: 10300,
      status_id: 1,
      individual_id: 2343567,
      first_name: 'Tal',
      last_name: 'Levi',
      email: undefined,
      address_id: 8,
      black_list: false
    }
]

export const account_for_mandatory = {
    individual_id: '2342567',
    first_name: 'Tal',
    last_name: 'Levi',
    currency: 'USD',
    balance: '10300',
    address: {
      country_name: 'Israel',
      country_code: '1234',
      postal_code: '233',
      city: 'Tel-Aviv',
      region: 'Center',
      street_name: 'Hashalom',
      street_number: '154'
    }
  }