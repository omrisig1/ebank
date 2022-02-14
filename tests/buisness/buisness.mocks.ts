export const get_buisness_dal_obj_return = {
    account_id: 4,
    currency: 'USD',
    balance: 10300,
    status_id: 1,
    individual_id: 2346567,
    black_list: false,
    company_id: 12345678,
    company_name: "rapyd",
    context: "billing",
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

  export const create_buisness_return_dal_obj = {
    account_id: 4,
    currency: 'USD',
    balance: 10300,
    status_id: 1,
    individual_id: 2346567,
    black_list: false,
    company_id: 12345678,
    company_name: "rapyd",
    context: "billing",
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

  export const create_buisness_return_dal_obj_same_comapny = {
    account_id: 5,
    currency: 'USD',
    balance: 10300,
    status_id: 1,
    individual_id: 2346567,
    black_list: false,
    company_id: 12345678,
    company_name: "rapyd",
    context: "billing",
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

  export const create_buisness_return_dal_obj_same_comapny_diffrent_currency = {
    account_id: 5,
    currency: 'EUR',
    balance: 10300,
    status_id: 1,
    individual_id: 2346567,
    black_list: false,
    company_id: 12345678,
    company_name: "rapyd",
    context: "billing",
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
  export const create_buisness_return_dal_obj_diffrent_comapny = {
    account_id: 5,
    currency: 'USD',
    balance: 10300,
    status_id: 1,
    individual_id: 2346567,
    black_list: false,
    company_id: 12345678,
    company_name: "rapyd",
    context: "billing",
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

  export const create_buisness_return_dal_obj_diffrent_comapny_dif_currency = {
    account_id: 5,
    currency: 'EUR',
    balance: 10300,
    status_id: 1,
    individual_id: 2346567,
    black_list: false,
    company_id: 12345678,
    company_name: "rapyd",
    context: "billing",
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

  export const create_buisness_dal_obj_balance_0 = {
    account_id: 4,
    currency: 'USD',
    balance: 0,
    status_id: 1,
    individual_id: 2346567,
    black_list: false,
    company_id: 12345678,
    company_name: "rapyd",
    context: "billing",
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

  export const create_buisness_dal_input = {
    currency: 'USD',
    balance: 10300,
    company_id: 12345678,
    company_name: "rapyd",
    address: {
        country_name: 'Israel',
        country_code: '1234',
   
    }
}

export const create_buisness_dal_input_no_balance = {
    currency: 'USD',
    balance: 0,
    company_id: 12345678,
    company_name: "rapyd",
    address: {
        country_name: 'Israel',
        country_code: '1234',
   
    }
}

export const create_buisness_dal_input_with_status_id = {
    currency: 'USD',
    balance: 10300,
    company_id: 12345678,
    company_name: "rapyd",
    status_id: 0,
    address: {
        country_name: 'Israel',
        country_code: '1234',
   
    }
}

export const create_buisness_dal_input_with_black_list= {
    currency: 'USD',
    balance: 10300,
    company_id: 12345678,
    company_name: "rapyd",
    black_list: true,
    address: {
        country_name: 'Israel',
        country_code: '1234',
   
    }
}