import { CategoryType, CreateCategoryDto } from '../types/category';
import * as Colors from './colors';

export const defaultCategories: CreateCategoryDto[] = [
  {
    id: '4ade3988-43f4-4ab5-951a-223806c9f5c7',
    name: 'TRANSFER_IN',
    type: CategoryType.income,
  },
  {
    id: '981fd55b-2840-4d9d-a758-f24e4bce1176',
    name: 'TRANSFER_OUT',
    type: CategoryType.outcome,
  },
  {
    id: '39da1fbc-1937-41b2-a46f-d2dce9a1f788',
    name: 'SYSTEM_EMPTY',
    type: CategoryType.income,
  },
  {
    id: '07c0ba04-d1a2-4a17-b526-ac7bb80e78b1',
    name: 'SYSTEM_EMPTY',
    type: CategoryType.outcome,
  },
  {
    id: 'bec3812e-5eb6-495f-b021-58bc39184cc7',
    name: 'TRANSFER_SYS',
    type: CategoryType.transfer,
    icon: {
      type: 'FontAwesome5',
      name: 'arrows-alt-h',
      backgroundColor: Colors.indigo600,
    },
  },
  {
    id: '822d7512-1643-4a05-8386-b0f6d0038cf9',
    name: 'category_food',
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'cart-outline',
      backgroundColor: Colors.pink900,
    },
  },
  {
    id: '064e5ddc-6e9d-4573-817e-da5aa5d8cdbf',
    name: 'category_products',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'food-apple-outline',
      backgroundColor: Colors.pink700,
    },
    parentId: '822d7512-1643-4a05-8386-b0f6d0038cf9',
  },
  {
    id: '064e5ddc-6e9d-4573-817e-da5aa5d8cdbf1',
    name: 'category_cafe',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'food',
      backgroundColor: Colors.pink600,
    },
    parentId: '822d7512-1643-4a05-8386-b0f6d0038cf9',
  },
  {
    id: '9999e114-2359-4eb8-832d-03e037ee7754',
    name: 'category_drink',
    type: CategoryType.outcome,
    icon: {
      type: 'Entypo',
      name: 'drink',
      backgroundColor: Colors.pink400,
    },
    parentId: '822d7512-1643-4a05-8386-b0f6d0038cf9',
  },
  {
    id: '973e1ef1-5801-4d00-8045-7129a12b06a6',
    name: 'category_things',
    type: CategoryType.outcome,
    icon: {
      type: 'Feather',
      name: 'shopping-bag',
      backgroundColor: Colors.purple900,
    },
  },
  {
    id: 'ac904eb0-6d4b-474a-bc90-0005e85e76e4',
    name: 'category_things_for_home',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'home-city-outline',
      backgroundColor: Colors.purple800,
    },
    parentId: '973e1ef1-5801-4d00-8045-7129a12b06a6',
  },
  {
    id: 'e2b09296-3204-4726-a5f7-5bf6fff6fe9d',
    name: 'category_clothes',
    type: CategoryType.outcome,
    icon: {
      type: 'AntDesign',
      name: 'skin',
      backgroundColor: Colors.purple700,
    },
    parentId: '973e1ef1-5801-4d00-8045-7129a12b06a6',
  },
  {
    id: '3c7b58d9-2dbd-4959-a7d5-655b09e6d4ff',
    name: 'category_electronic_things',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome',
      name: 'television',
      backgroundColor: Colors.purple500,
    },
    parentId: '973e1ef1-5801-4d00-8045-7129a12b06a6',
  },
  {
    id: '598cda57-bb45-402d-b67f-2b86f193f4d6',
    name: 'category_public_transport',
    type: CategoryType.outcome,
    icon: {
      type: 'Ionicons',
      name: 'ios-bus',
      backgroundColor: Colors.yellow900,
    },
  },
  {
    id: '2d701d0e-cefe-49da-a57f-ffeeba8dfa51',
    name: 'category_car',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome5',
      name: 'car',
      backgroundColor: Colors.teal900,
    },
  },
  {
    id: '73fe51e1-baad-4473-b553-981a76490208',
    name: 'category_car_fuel',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome5',
      name: 'gas-pump',
      backgroundColor: Colors.teal800,
    },
    parentId: '2d701d0e-cefe-49da-a57f-ffeeba8dfa51',
  },
  {
    id: 'ff52d78e-e62a-4ea7-8220-d1b0e655974a',
    name: 'category_car_parking',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'parking',
      backgroundColor: Colors.teal700,
    },
    parentId: '2d701d0e-cefe-49da-a57f-ffeeba8dfa51',
  },
  {
    id: '6473ca86-7d87-42a9-92b0-10ece28ebbc0',
    name: 'category_car_fixing',
    type: CategoryType.outcome,
    icon: {
      type: 'AntDesign',
      name: 'tool',
      backgroundColor: Colors.teal600,
    },
    parentId: '2d701d0e-cefe-49da-a57f-ffeeba8dfa51',
  },
  {
    id: 'e8f5b8f1-8d3f-4373-b7b5-46f266325bd2',
    name: 'category_car_insurance',
    type: CategoryType.outcome,
    parentId: '2d701d0e-cefe-49da-a57f-ffeeba8dfa51',
    icon: {
      type: 'Ionicons',
      name: 'ios-paper',
      backgroundColor: Colors.teal500,
    },
  },
  {
    id: 'c95c7c5b-873a-492e-9051-dc9244035bd4',
    name: 'category_car_fines',
    parentId: '2d701d0e-cefe-49da-a57f-ffeeba8dfa51',
    type: CategoryType.outcome,
    icon: {
      type: 'Octicons',
      name: 'law',
      backgroundColor: Colors.teal400,
    },
  },
  {
    id: '76822c56-2b8b-4a91-82b7-3b4b88e42a8f',
    name: 'category_communication',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'phone-in-talk',
      backgroundColor: Colors.deepOrange900,
    },
  },
  {
    id: 'dfff69c7-84d3-4574-bf1d-418807cae306',
    name: 'category_communication_phone',
    type: CategoryType.outcome,
    icon: {
      type: 'Entypo',
      name: 'mobile',
      backgroundColor: Colors.deepOrange800,
    },
    parentId: '76822c56-2b8b-4a91-82b7-3b4b88e42a8f',
  },
  {
    id: '1a40fad0-a123-4fdc-9f84-7a74ce9f359d',
    name: 'category_communication_internet',
    type: CategoryType.outcome,
    icon: {
      type: 'Entypo',
      name: 'network',
      backgroundColor: Colors.deepOrange700,
    },
    parentId: '76822c56-2b8b-4a91-82b7-3b4b88e42a8f',
  },
  {
    id: 'a1e65d28-4034-439e-993d-b32c142204b3',
    name: 'category_housing',
    type: CategoryType.outcome,
    icon: {
      type: 'AntDesign',
      name: 'home',
      backgroundColor: Colors.lightGreen900,
    },
  },
  {
    id: 'cab3c9b4-4bea-4b97-af4f-6a51ba78a429',
    name: 'category_housing_rent',
    type: CategoryType.outcome,
    icon: {
      type: 'AntDesign',
      name: 'home',
      backgroundColor: Colors.lightGreen700,
    },
    parentId: 'a1e65d28-4034-439e-993d-b32c142204b3',
  },
  {
    id: 'e3d496bd-b209-4618-bd94-8de35d867bc5',
    name: 'category_housing_services',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'home-city-outline',
      backgroundColor: Colors.lightGreen500,
    },
    parentId: 'a1e65d28-4034-439e-993d-b32c142204b3',
  },
  {
    id: 'e99e87f0-f824-4c05-a544-0e77568047f0',
    name: 'category_unexpected',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'basket-unfill',
      backgroundColor: Colors.brown700,
    },
  },
  {
    id: 'a09d7b2e-6f9e-452c-ab1e-a621b8d61f0f',
    name: 'category_travels',
    type: CategoryType.outcome,
    icon: {
      type: 'Fontisto',
      name: 'holiday-village',
      backgroundColor: Colors.indigo900,
    },
  },
  {
    id: '30a85193-a3a4-4d9c-8a0e-e86232f7f4b3',
    name: 'category_travels_hotel',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome',
      name: 'hotel',
      backgroundColor: Colors.indigo700,
    },
    parentId: 'a09d7b2e-6f9e-452c-ab1e-a621b8d61f0f',
  },
  {
    id: '158c3106-abd9-4127-af65-0cb1dabf8b59',
    name: 'category_travels_tickets',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome',
      name: 'ticket',
      backgroundColor: Colors.indigo600,
    },
    parentId: 'a09d7b2e-6f9e-452c-ab1e-a621b8d61f0f',
  },
  {
    id: 'f5b5bb95-1863-40e3-a69b-3a279ccef280',
    name: 'category_entertaiments',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome5',
      name: 'theater-masks',
      backgroundColor: Colors.pink800,
    },
  },
  {
    id: '40e4d8c1-26ec-4544-9ccb-9a0fa3b0dc0b',
    name: 'category_music',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome',
      name: 'music',
      backgroundColor: Colors.pink700,
    },
    parentId: 'f5b5bb95-1863-40e3-a69b-3a279ccef280',
  },

  {
    id: '4fa40799-2e28-4c6b-bf18-0c1e93efd9af',
    name: 'category_sport',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome5',
      name: 'dumbbell',
      backgroundColor: Colors.pink400,
    },
  },
  {
    id: 'd9e10b9b-cee9-47e5-a8d0-729991107d8b',
    name: 'category_medicine',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'heart-pulse',
      backgroundColor: Colors.indigo900,
    },
  },
  {
    id: '080a42e9-32b1-4b4a-bda5-b5b1203f3c0c',
    name: 'category_education',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome5',
      name: 'graduation-cap',
      backgroundColor: Colors.purple700,
    },
  },
  {
    id: '0b9e9f63-7e12-430f-9b07-05f5ff6fe8ce',
    name: 'category_children',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome',
      name: 'child',
      backgroundColor: Colors.blue700,
    },
  },
  {
    id: '2321279b-56be-4ef1-872f-b7f8a3304247',
    name: 'category_pets',
    type: CategoryType.outcome,
    icon: {
      type: 'Entypo',
      name: 'baidu',
      backgroundColor: Colors.deepOrange700,
    },
  },
  {
    id: '0edf8617-9ceb-4416-9f02-0e2ad36881dc',
    name: 'category_gift',
    type: CategoryType.outcome,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'gift-outline',
      backgroundColor: Colors.teal900,
    },
  },
  {
    id: 'fb0a86d0-89eb-4762-ae56-4d237b367eb9',
    name: 'category_tax',
    type: CategoryType.outcome,
    icon: {
      type: 'FontAwesome5',
      name: 'hand-holding-usd',
      backgroundColor: Colors.green700,
    },
  },
  {
    id: 'f9dd29db-3531-4ec5-911e-93bf040d485a',
    name: 'category_income',
    type: CategoryType.income,
    icon: {
      type: 'MaterialIcons',
      name: 'attach-money',
      backgroundColor: Colors.cyan900,
    },
  },
  {
    id: 'dde9435f-a305-4945-9766-345c9c06ba82',
    name: 'category_income_salary',
    type: CategoryType.income,
    icon: {
      type: 'FontAwesome',
      name: 'money',
      backgroundColor: Colors.cyan800,
    },
    parentId: 'f9dd29db-3531-4ec5-911e-93bf040d485a',
  },
  {
    id: 'ca93218f-b021-42de-8fd7-a8b6c448727b',
    name: 'category_income_prize',
    type: CategoryType.income,
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'wallet-giftcard',
      backgroundColor: Colors.cyan700,
    },
    parentId: 'f9dd29db-3531-4ec5-911e-93bf040d485a',
  },
  {
    id: '78adcc2e-9d2f-4bcd-8acc-972b9b80dcc3',
    name: 'category_deposit',
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'sack-percent',
      backgroundColor: Colors.teal900,
    },
    type: CategoryType.income,
  },
  {
    id: 'b0d2666a-ff1b-4035-b575-417bfcbd2664',
    name: 'category_gift',
    icon: {
      type: 'MaterialCommunityIcons',
      name: 'gift-outline',
      backgroundColor: Colors.deepOrange900,
    },
    type: CategoryType.income,
  },
];
