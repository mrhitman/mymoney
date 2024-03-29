import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  await knex('transaction').del();
  await knex('budget').del();
  return knex('currency')
    .del()
    .then(() => {
      return knex('currency').insert(
        [
          ['34684838-1451-52e9-a0e1-277324198bfb', 'AED', '.د.إ', 'UAE Dirham', 784],
          ['5af807c8-8027-5723-95b6-54c3073b12ec', 'AFN', '؋', 'Afghan afghani', 971],
          ['762d4caf-4c4d-5410-952f-4196ba0555cd', 'ALL', 'Lek', 'Albanian lek', 8],
          ['fc7f4ff4-a250-50b5-a5c0-54e122d4cfb5', 'AMD', 'դր', 'Armenian dram', 51],
          [
            '5fc7d0f5-8ab4-585b-9092-30a426aa2e0b',
            'ANG',
            'ƒ',
            'Netherlands Antillean Guilder',
            532,
          ],
          ['fe2b6f91-9bd6-5448-b339-b94b9efa58c5', 'AOA', 'Kz', 'Angolan kwanza', 973],
          ['68eec143-ac8f-5ac5-8e66-e01d7414945d', 'ARS', '$', 'Argentine peso', 32],
          ['90522806-be78-5115-9d4f-906465330d51', 'AUD', '$', 'Australian dollar', 36],
          ['1442a2e6-5ee1-5461-9cbe-b4f434a505f1', 'AWG', 'ƒ', 'Aruban florin', 533],
          ['d9cfb109-e736-52bb-9f62-08c98ac34cb7', 'AZN', '₼', 'Azerbaijani manat', 944],
          [
            '88714c1a-b06f-5216-a8f0-a8da7f066cf3',
            'BAM',
            'KM',
            'Bosnia and Herzegovina convertible mark',
            977,
          ],
          ['2afdcac7-2d8f-5094-84a7-c34a46d09e45', 'BBD', '$', 'Barbadian dollar', 52],
          ['384760e3-1ddd-5cd0-8622-0d5ebaa12e96', 'BDT', '৳', 'Bangladeshi taka', 50],
          ['014c3a8b-6522-5534-9602-d259ecad79f9', 'BGN', 'лв', 'Bulgarian lev', 975],
          ['154f835a-8ee1-579c-8025-2d70d69efd03', 'BHD', '.د.ب', 'Bahraini dinar', 48],
          ['2a6dc16f-52de-5c47-96b5-3ecc661248cd', 'BIF', '₣', 'Burundian franc', 108],
          ['cc2bf60a-766b-59db-8364-a0deed5bba39', 'BMD', '$', 'Bermudian dollar', 60],
          ['a5870e64-cb32-5407-94fd-02d902067256', 'BND', '$', 'Brunei dollar', 96],
          ['82e88d47-a0f8-5c70-9272-a5ef1c18ed13', 'BOB', '$b', 'Bolivian Boliviano', 68],
          ['bd0b1840-f079-517f-b1be-17d9cfa06aa3', 'BRL', 'R$', 'Brazilian real', 986],
          ['7ec9beb5-57d1-5173-9816-beec4a2e2e22', 'BSD', '$', 'Bahamian dollar', 44],
          ['35268e11-8c37-5ba5-8d78-75ecfb4ae9fc', 'BTC', '₿', 'Bitcoin', 0],
          ['d729a672-b239-5e24-b0c5-2a7133c3c55e', 'BTN', 'Nu', 'Bhutanese ngultrum', 64],
          ['3cf1c0cc-c943-5b29-9b27-691b916264f6', 'BWP', 'P', 'Botswana pula', 72],
          ['7a56d7ca-7e0d-5234-9832-b04488c908bc', 'BYN', 'Br', 'Belarusian ruble', 933],
          ['b5510b91-2e68-56ae-9bf2-f1a3c81395b4', 'BYR', '₽', 'Belarusian ruble', 933],
          ['0b8b2afb-dd48-5a3a-815b-3ead4e7c1a2b', 'BZD', 'BZ$', 'Belize dollar', 84],
          ['04d0f0a1-ec85-5725-9fbf-77ebd551d559', 'CAD', '$', 'Canadian dollar', 124],
          ['381231e8-6612-5f08-b91a-6d2f98e01069', 'CDF', 'FC', 'Congolese franc', 976],
          ['9eb0dddb-209d-5f61-a96b-95ec1fff65d7', 'CHF', 'CHF', 'Swiss franc', 756],
          ['c32ee98f-d633-50d5-8830-f7a6c0c0626b', 'CLF', 'UF', 'Unidad de Fomento', 990],
          ['4e5c216c-14b1-509b-9a30-ec4e9d1430ee', 'CLP', '$', 'Chilean peso', 152],
          ['201ad936-eef9-53a7-8ff9-08ca9ef29b3f', 'CNY', '¥', 'Renminbi', 156],
          ['36153406-9d5f-5553-9e3c-e8a56ea2fa33', 'COP', '$', 'Colombian peso', 170],
          ['9fb31ca1-f94a-5e0d-8bb4-e635601ad524', 'CRC', '₡', 'Costa Rican colón', 188],
          ['04809a56-2853-55fa-99b3-203167b2d813', 'CUC', '$', 'Peso Convertible', 931],
          ['49994fc1-0384-5319-83b9-58e0a9babcf1', 'CUP', '₱', 'Cuban peso', 192],
          ['d04e9c49-42d9-54cc-8f25-bf69d9a1a3a2', 'CVE', '$', 'Cape Verdean escudo', 132],
          ['9c619d56-33ef-50af-8251-a00c5fe5db94', 'CZK', 'Kč\t', 'Czech koruna', 203],
          ['e21e5d93-1f92-54f1-94cf-b5f548511a00', 'DJF', 'Fdj', 'Djiboutian franc', 262],
          ['f260558e-0490-57b6-bfbc-7badc1e387c0', 'DKK', 'kr', 'Danish krone', 208],
          ['1bfb4496-08a9-5409-b71d-c75d598abb24', 'DOP', 'RD$', 'Dominican peso', 214],
          ['41dbc089-ae22-5b22-8001-b8ab2e21d1a5', 'DZD', '.د.ج', 'Algerian dinar', 12],
          ['bf861511-a1f4-55b5-9955-6f3fb8171ef6', 'EGP', '£', 'Egyptian pound', 818],
          ['a361b34b-655a-509b-889a-a391037f0dfa', 'ERN', 'Nkf', 'Eritrean nakfa', 232],
          ['83786f5d-eb3b-5eda-aaec-b3bd8fca3979', 'ETB', 'Br', 'Ethiopian birr', 230],
          ['29cfd611-3efb-5717-b9ca-f9b18956d097', 'EUR', '€', 'Euro', 978],
          ['4f2351ef-3ec2-5d53-bb38-b1cda406a4c4', 'FJD', '$', 'Fijian dollar', 242],
          ['4cb59064-0f37-5e83-b913-9e69af1abd0f', 'FKP', '£', 'Falkland Islands pound', 238],
          ['4852f25f-4970-5901-b90b-755dd3d7c696', 'GBP', '£', 'Pound sterling', 826],
          ['e22d2d73-82c0-51e8-a86b-0c7edba11b94', 'GEL', '₾', 'Georgian lari', 981],
          ['1de49b70-49a1-59d5-bd2a-aa5916167463', 'GGP', '£', 'Guernsey Pound', 0],
          ['02f4957f-f542-5eb8-abbd-fc41f66352ca', 'GHS', '$', 'Ghanaian cedi', 936],
          ['c1bbedf9-bd48-567c-af46-b568537a2a9b', 'GIP', '£', 'Gibraltar pound', 292],
          ['a3e76a12-c8b5-5832-8996-411f63f9068a', 'GMD', 'D', 'Dalasi', 270],
          ['c659a69c-823c-5cf4-9d95-e6fb4204ceed', 'GNF', 'FG', 'Guinean franc', 324],
          ['85279fc6-34f7-5fd2-91ef-e906a6de3417', 'GTQ', 'Q', 'Quetzal', 320],
          ['d75f5706-9c08-5f2a-bf22-4c4b2289571e', 'GYD', '$', 'Guyana Dollar', 328],
          ['1976f2de-a49d-596b-9f5c-6bc96a20bb18', 'HKD', '$', 'Hong Kong dollar', 344],
          ['644fef07-4f05-5334-ba9b-34866da076dd', 'HNL', 'L', 'Lempira', 340],
          ['95aff6b4-278e-5e9c-9fc8-3c8dfbd6610e', 'HRK', 'kn', 'Croatian kuna', 191],
          ['361f1678-6df0-50c9-b6c2-fd25378492db', 'HTG', 'G', 'Haitian gourde', 332],
          ['47b228fc-f022-56bb-b996-fc0023f07d23', 'HUF', 'Ft', 'Hungarian forint', 348],
          ['be8e7439-a7c6-5634-962f-8581d171aafa', 'IDR', 'Rp', 'Rupiah', 360],
          ['d8366dbb-3a02-5d45-949a-f2963a49c3ba', 'ILS', '₪', 'Israeli new shekel', 376],
          ['ddb0d43b-8e72-5aa6-ba20-d74d72d6485d', 'IMP', '£', 'Manx pound', 0],
          ['0c798529-cd0c-5cf2-bbb0-50e62fee9e2c', 'INR', '₹', 'Indian rupee', 356],
          ['93ac3f25-f6ea-5e1d-828f-2f0beaa921e5', 'IQD', 'د.ع', 'Iraqi dinar', 368],
          ['82dde97b-623b-56d1-8a3a-338baa90585c', 'IRR', '﷼', 'Iranian rial', 364],
          ['aa90aecc-96cb-51e7-9456-3d1172cd0085', 'ISK', 'kr', 'Icelandic króna', 352],
          ['49a1699e-3cf7-5b07-a9bb-f73a6004b3fe', 'JEP', '£', 'Jersey pound', 0],
          ['e97ec890-7793-50b4-b222-d91df1c526ea', 'JMD', 'J$', 'Jamaican Dollar', 388],
          ['30af9d8e-3085-50db-a5b0-f084ecf47a6d', 'JOD', 'د.إ', 'Jordanian Dinar', 400],
          ['10cf954e-e0d6-52f1-9bb0-17d25fbc1ced', 'JPY', '¥', 'Japanese yen', 392],
          ['3df667af-5cd5-5ef7-907f-089ba5a79cb1', 'KES', 'KSh', 'Kenyan shilling', 404],
          ['49fbaab4-7187-5f9d-b21c-2446066914e4', 'KGS', 'с', 'Kyrgyzstani som', 417],
          ['06c66e97-5917-5d8f-96d5-8968f8595e7f', 'KHR', '៛', 'Cambodian riel', 116],
          ['a153554e-7ac1-5ee7-9f94-845ef23587b5', 'KMF', 'CF', 'Comorian franc', 174],
          ['71aa897a-ab57-53ac-9c97-a40030a03b10', 'KPW', '₩', 'North Korean won', 408],
          ['0de227bd-94ac-57be-acf6-a41a5113bfb5', 'KRW', '₩', 'South Korean won', 410],
          ['e2c504cd-7f4e-5403-a0df-a703210064ab', 'KWD', '.د.ك', 'Kuwaiti dinar', 414],
          ['719766e9-ced7-5023-8005-0985fd9f5919', 'KYD', '$', 'Cayman Islands Dollar ', 136],
          ['a57b3e7c-647c-5e27-83d2-d5ea9b4ec0dc', 'KZT', 'лв', 'Kazakhstani tenge', 398],
          ['9ffaff2f-10f8-5f18-a68a-50c809bd86e0', 'LAK', '₭', 'Lao kip', 418],
          ['1c765d03-4eb5-5967-a63a-514ce8d6c970', 'LBP', '£', 'Lebanese pound', 422],
          ['773034fa-ba0f-588d-9105-b3ae9fe73c0b', 'LKR', '₨', 'Sri Lankan rupee', 144],
          ['135d1d73-32d9-5e3e-a3a6-b016375c2f51', 'LRD', '$', 'Liberian dollar', 430],
          ['396807e7-7754-5467-b07a-6c879ba32d9e', 'LTL', 'Lt', 'Lithuanian litas', 0],
          ['c6aa1812-3323-5653-b3b5-f3ca37fe0905', 'LVL', 'Ls', 'Lithuanian litas', 0],
          ['474f0c95-7ff1-5f8d-a270-993bca19c3bd', 'LYD', '.د.ل', 'Libyan dinar', 434],
          ['05e5eb7e-3a8d-50cb-ac50-adbac8fbe0e7', 'MAD', 'Dh', 'Moroccan dirham', 504],
          ['710b3604-1cb5-515e-9225-3299d9e692fc', 'MDL', 'L', 'Moldovan leu', 498],
          ['71f6deeb-39d6-564b-9384-2f9a93eb4830', 'MGA', 'Ar.', 'Malagasy Ariary', 969],
          ['3e0bee0d-9a29-5877-b55f-0d75684af542', 'MKD', 'ден', 'Denar', 807],
          ['c9af12c3-cc26-5c8d-a4e2-a6025e053270', 'MMK', 'K', 'Kyat', 104],
          ['fdf51059-fe96-501a-9dcb-0acd62f8cd12', 'MNT', '₮', 'Tugrik', 496],
          ['49f4c6c4-e626-4288-9fa7-b24024425401', 'LSL', 'L', 'Lesotho loti', 426],
          ['09b5a773-8024-50a5-a418-4a7d1e627bf8', 'MOP', 'MOP$', 'Macanese pataca', 446],
          ['06579b33-6b7e-599c-9371-791bb0996b72', 'MRO', 'UM', 'Ouguiya', 0],
          ['76861997-2ed2-5365-afdb-22e2874bf58c', 'MUR', '₨', 'Mauritian rupee', 480],
          ['750f8812-cd87-5a0f-89c0-d5162aa3232f', 'MVR', 'Rufiyaa', 'Rf', 462],
          ['1bed0f51-7436-5fff-bea3-a8ea67577176', 'MWK', 'K', 'Malawian kwacha', 454],
          ['816f0d97-4a4d-5ae0-8c16-58cffd3b46e2', 'MXN', '$', 'Mexican peso', 484],
          ['e6a98ca9-f1ce-5300-91d4-54ba5687561c', 'MYR', 'RM', 'Malaysian ringgit', 458],
          ['1211419b-97aa-5ccb-8ddf-834576d97085', 'MZN', 'MT', 'Mozambique Metical', 943],
          ['38a7fe49-0ada-5ae4-b351-b05b70ca1330', 'NAD', '$', 'Namibia Dollar ', 516],
          ['227b0072-b875-5b1d-9c5d-73a54200dde7', 'NGN', '₦', 'Nigerian naira', 566],
          ['8803f254-91b3-5217-b56c-b8c48074e810', 'NIO', 'C$', 'Nicaraguan córdoba', 558],
          ['978244d4-aa11-5518-a8aa-adffdd3797a3', 'NOK', 'kr', 'Norwegian krone', 578],
          ['105cb94b-fc76-5dbb-8b12-639d7386adea', 'NPR', '₨', 'Nepalese rupee', 524],
          ['3818d1e0-08ef-5f4a-b8bc-1d8e394df7c7', 'NZD', '$', 'New Zealand dollar', 554],
          ['493b0da6-9d9e-5dca-a82c-b1f21fa11eb3', 'OMR', '﷼', 'Omani rial', 512],
          ['2a848cb0-458a-5da7-b977-bb5a3d1ec4a1', 'PAB', 'B/.', 'Balboa', 590],
          ['363fac5f-f920-52d6-93ef-9dca5db40e65', 'PEN', 'S/.', 'Sol', 604],
          ['804e2745-3126-57ec-bc11-1f3b18875390', 'PGK', 'K', 'Kina', 598],
          ['fb076e7f-4d97-5bc7-9558-a9725098683a', 'PHP', '₱', 'Philippine peso', 608],
          ['80ee35e2-04d4-5a7f-833a-43d8560490d0', 'PKR', '₨', 'Pakistani rupee', 586],
          ['0884020a-2450-5e8d-b2ce-786a0e8c3bb3', 'PLN', 'zł', 'Polish złoty', 985],
          ['28f13ee9-8983-5f54-a1f9-1c36807cadc6', 'PYG', 'Gs', 'Paraguayan guaraní', 600],
          ['173244cd-629b-5df3-b025-9bc7134b03c7', 'QAR', '﷼', 'Qatari riyal', 634],
          ['9bbf2b2c-dafd-5228-9053-48042f9df113', 'RON', 'lei', 'Romanian leu', 946],
          ['1a4c947d-887f-50bb-a895-bac18feb5e8b', 'RSD', 'Дин.', 'Serbian dinar', 941],
          ['4a096cb2-3a67-577a-9668-86e3e2a306e9', 'RUB', '₽', 'Russian ruble', 643],
          ['d4b9167b-f37e-57e9-bef4-495decc1a946', 'RWF', '₣', 'Rwandan franc', 646],
          ['caa79235-b683-5062-8a5b-b1792cd8ea42', 'SAR', '﷼', 'Saudi riyal', 682],
          ['05da9450-2cf6-5c4b-acad-a83d0f596224', 'SBD', '$', 'Solomon Islands dollar', 90],
          ['48cc937b-03e4-5d3c-b087-ec73217c7c80', 'SCR', '₨', 'Seychelles Rupee', 690],
          ['6e707b72-1cda-503e-a06b-68cd086be861', 'SDG', '£', 'Sudanese pound', 938],
          ['69f513f4-439c-5c59-aa85-b107c6c2b5c3', 'SEK', 'kr', 'Swedish krona', 752],
          ['47f293fe-94ae-5d48-acce-1f14e1cea2a3', 'SGD', '$', 'Singapore dollar', 702],
          ['e0256d27-90ac-5ccf-a4e8-6ffeba587114', 'SHP', '£', 'Saint Helena pound', 654],
          ['504a5c17-2787-543b-9a13-43b8166dd705', 'SLL', 'Le', 'Sierra Leonean leone', 694],
          ['5de37db6-0ea2-599e-970a-7ec6230bf1c1', 'SOS', 'S', 'Somali shilling', 706],
          ['d435a872-11dc-5e77-8a17-375bc8acfc4c', 'SRD', '$', 'Surinamese dollar', 968],
          ['2a638f2c-c883-54f6-8670-ce864f414ddf', 'STD', 'Db', 'Dobra', 0],
          ['c02efdd4-4e82-5389-a619-4d340f566201', 'SVC', '$', 'El Salvador Colon', 222],
          ['1cffa5c3-d3c5-57e3-a508-cdbf6651fab1', 'SYP', '£', 'Syrian pound', 760],
          ['e9a10f60-159f-54b6-9368-90d1bc61d7ca', 'SZL', 'L', 'Swazi lilangeni', 748],
          ['f0853ea2-2e51-5354-8df8-a3161011090a', 'THB', '฿', 'Thai baht', 764],
          ['ca940eed-6ecf-5264-8c73-8685151b905c', 'TJS', 'с.', 'Tajikistani somoni', 972],
          ['b43cf308-a549-565e-b028-d90ae41ea815', 'TMT', 'm', 'Turkmenistan manat', 934],
          ['b3db7325-80f4-5108-9b58-3d2593a7b7b4', 'TND', '.د.ت', 'Tunisian dinar', 788],
          ['beee3724-225a-590c-9fd1-ac3909904deb', 'TRY', '₺', 'Turkish lira', 949],
          ['fc9829cf-d0e7-5bf2-9955-2b2a0eef5770', 'TTD', 'TT$', 'Trinidad and Tobago dollar', 780],
          ['11255046-658b-53f0-9edb-8160f73d3066', 'TWD', 'NT$', 'New Taiwan Dollar', 901],
          ['37ca7612-07e6-5ecf-9449-1cde74026248', 'TZS', 'TSh', 'Tanzanian Shilling', 834],
          ['096225f7-d38e-5650-8b9f-a19034a5fe6e', 'UAH', '₴', 'Ukrainian hryvnia', 980],
          ['2f0b10f1-8d3f-55d7-b571-db6449c17983', 'UGX', 'USh', 'Uganda Shilling', 800],
          ['040864eb-a01d-5660-8b23-d26ab5088233', 'USD', '$', 'United States dollar', 840],
          ['1ceb3496-ee32-5d0f-add0-b4860bcf79eb', 'UYU', '$U', 'Uruguayan peso', 858],
          ['fc956478-29fc-5ce5-b5a9-bcd623e297f4', 'UZS', 'so’m', 'Uzbekistani soʻm', 860],
          ['9b0120d7-e779-5e61-9214-100d7f2e2fab', 'VEF', 'Bs', 'Venezuelan bolívar', 0],
          ['df29ee0f-b036-5a3e-9db4-29b4d5cefe12', 'VND', '₫', 'Vietnamese dong', 704],
          ['04e32e7c-8f77-5e42-acdd-91168309f8aa', 'VUV', 'Vt', 'Vanuatu vatu', 548],
          ['642490ca-d32d-5caf-8a77-7ba41eaadbd6', 'WST', 'WS$', 'Samoan tālā', 882],
          ['d9faee01-f092-5c87-ba22-8a77d0ea3907', 'XAF', '₣', 'Franc CFA BEAC', 950],
          [
            'bf796e81-9b95-59a0-bf59-80c5756f3644',
            'XAG',
            'Troy Ounce',
            'Troy Ounce Silver in US Dollars',
            961,
          ],
          ['b74c1886-f34e-51b9-becb-769184fac0a9', 'XAU', 'Ounce', 'Gold Ounce', 959],
          ['54da6140-257c-502c-933f-aa4ae4bb1a3c', 'XCD', '$', 'Eastern Caribbean dollar', 951],
          ['a2333971-1b3d-5609-81f4-96ea97b10502', 'XDR', 'SDR', 'Special Drawing Rights', 960],
          ['f6a6fdc5-e85d-5276-850e-efc7e3ec746c', 'XOF', '₣', 'CFA Franc BCEAO', 952],
          ['58dc8509-3b53-530e-beef-2d0978e2dfd0', 'XPF', '₣', 'CFP franc', 953],
          ['1d73ca4d-2455-5147-9f06-702485b3523c', 'YER', '﷼', 'Yemeni rial', 886],
          ['c604f34e-9131-5b58-8ff0-49f82fb74093', 'ZAR', 'R', 'South African rand', 710],
          ['02fac608-7def-5a3e-a0b2-1eef1d240d06', 'ZMK', 'K', 'Zambian kwacha', 0],
          ['c29cb031-c1f2-56d1-9716-40f3279fcf71', 'ZMW', 'K', 'Zambian kwacha', 967],
          ['21eb53db-c9fa-5e26-b7cb-776ecd567874', 'ZWL', '$', 'Zimbabwean dollar', 932],
        ]
          .sort()
          .map(([id, name, symbol, description, code]) => ({
            id,
            name,
            symbol,
            description,
            code,
          })),
      );
    });
}
