export const get_individual_dal_obj_return = {
    account_id: 4,
    currency: 'USD',
    balance: 10300,
    status_id: 1,
    individual_id: 2346567,
    first_name: 'Tal',
    last_name: 'Jon',
    email: undefined,
    black_list: false,
    address: {
      address_id: 4,
      country_name: 'Israel',
      country_code: '1234',
      postal_code: '233',
      city: 'Tel-Aviv',
      region: 'Center',
      street_name: 'Hashalom',
      street_number: "154",
    }
  }

  export const create_individual_return_dal_obj = {
    account_id: 4,
    currency: 'USD',
    balance: 10300,
    status_id: 1,
    individual_id: 2346567,
    first_name: 'Tal',
    last_name: 'Jon',
    email: undefined,
    black_list: undefined,
    address: {
      address_id: 4,
      country_name: 'Israel',
      country_code: '1234',
      postal_code: '233',
      city: 'Tel-Aviv',
      region: 'Center',
      street_name: 'Hashalom',
      street_number: "154",
    }
  }
  export const create_individual_dal_obj_balance_0 = {
    account_id: 4,
    currency: 'USD',
    balance: 0,
    status_id: 1,
    individual_id: 2346567,
    first_name: 'Tal',
    last_name: 'Jon',
    email: undefined,
    black_list: undefined,
    address: {
      address_id: 4,
      country_name: 'Israel',
      country_code: '1234',
      postal_code: '233',
      city: 'Tel-Aviv',
      region: 'Center',
      street_name: 'Hashalom',
      street_number: "154",
    }
  }

  export const create_individual_dal_input = {
    currency: 'USD',
    balance: 10300,
    individual_id: 2346567,
    first_name: 'Tal',
    last_name: 'Jon',
    email: undefined,
    address: {
        country_name: 'Israel',
        country_code: '1234',
   
    }
}

export const create_individual_dal_input_no_balance = {
    currency: 'USD',
    individual_id: 2346567,
    first_name: 'Tal',
    last_name: 'Jon',
    email: undefined,
    address: {
        country_name: 'Israel',
        country_code: '1234',
   
    }
}

export const create_individual_dal_input_with_status_id = {
    currency: 'USD',
    individual_id: 2346567,
    first_name: 'Tal',
    status_id: 0,
    last_name: 'Jon',
    email: undefined,
    address: {
        country_name: 'Israel',
        country_code: '1234',
   
    }
}