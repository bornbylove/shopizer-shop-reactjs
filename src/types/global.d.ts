interface Window {
  _env_: {
    APP_MAP_API_KEY: string;
    APP_PAYMENT_TYPE: string;
    APP_STRIPE_PUBLIC_KEY: string;
    API_URL: string;
    APP_BASE_URL: string;
  };
}

declare namespace google {
  namespace maps {
    class Autocomplete {
      constructor(input: Element, opts?: AutocompleteOptions);
      addListener(event: string, handler: () => void): void;
      getPlace(): PlaceResult;
      setFields(fields: string[]): void;
    }
    interface AutocompleteOptions {
      types?: string[];
    }
    interface PlaceResult {
      address_components: AddressComponent[];
      formatted_address?: string;
    }
    interface AddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }
    namespace places {
      class Autocomplete extends google.maps.Autocomplete {}
    }
  }
}
