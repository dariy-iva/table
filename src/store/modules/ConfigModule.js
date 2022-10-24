export default {
  state: () => ({
    filialList: [],
    initiatorList: [],
    functionalList: [],
  }),

  getters: {
    filialList(state) {
      return state.filialList;
    },
    initiatorList(state) {
      return state.initiatorList;
    },
    functionalList(state) {
      return state.functionalList;
    }
  },

  mutations: {
    setFilialList(state, payload) {
      state.filialList = payload.filialList;
    },
    setInitiatorList(state, payload) {
      state.initiatorList = payload.initiatorList;
    },
    setFunctionalList(state, payload) {
      state.functionalList = payload.functionalList;
    },
  },

  actions: {
    getFilialList({commit}) {
      const filialList = [
        {
          name: 'Дальневосточный филиал',
          id: 1,
          regions: [
            {name: 'Амурская область'},
            {name: 'Еврейская автономная область'},
            {name: 'Забайкальский край'},
            {name: 'Камчатский край'},
            {name: 'Магаданская область'},
            {name: 'Приморский край'},
            {name: 'Республика Бурятия'},
            {name: 'Республика Саха (Якутия)'},
            {name: 'Сахалинская область'},
            {name: 'Хабаровский край'},
            {name: 'Чукотский автономный округ'},
          ],
        },
        {
          name: 'Поволжский филиал',
          id: 2,
          regions: [
            {name: 'Кировская область'},
            {name: 'Нижегородская область'},
            {name: 'Оренбургская область'},
            {name: 'Пензенская область'},
            {name: 'Пермский край'},
            {name: 'Республика Башкортостан'},
            {name: 'Республика Марий Эл'},
            {name: 'Республика Мордовия'},
            {name: 'Республика Татарстан'},
            {name: 'Самарская область'},
            {name: 'Саратовская область'},
            {name: 'Удмуртская Республика'},
            {name: 'Ульяновская область'},
            {name: 'Чувашская Республика'},
          ],
        },
        {
          name: 'Северо-Западный филиал',
          id: 3,
          regions: [
            {name: 'Архангельская область'},
            {name: 'Волгоградская область'},
            {name: 'Калининградская область'},
            {name: 'Ленинградская область'},
            {name: 'Мурманская область'},
            {name: 'Ненецкий автономный округ'},
            {name: 'Новгородская область'},
            {name: 'Псковская область'},
            {name: 'Республика Карелия'},
            {name: 'Республика Коми'},
            {name: 'Санкт-Петербург'},
          ],
        },
        {
          name: 'Северо-Кавказский филиал',
          id: 4,
          regions: [
            {name: 'Кабардино-Балкарская Республика'},
            {name: 'Карачаево-Черкесская Республика'},
            {name: 'Республика Дагестан'},
            {name: 'Республика Ингушетия'},
            {name: 'Республика Северная Осетия — Алания'},
            {name: 'Ставропольский край'},
            {name: 'Чеченская Республика'},
          ],
        },
        {
          name: 'Сибирский филиал',
          id: 5,
          regions: [
            {name: 'Алтайский край'},
            {name: 'Иркутская область'},
            {name: 'Кемеровская область'},
            {name: 'Красноярский край'},
            {name: 'Новосибирская область'},
            {name: 'Омская область'},
            {name: 'Республика Алтай'},
            {name: 'Республика Тыва'},
            {name: 'Республика Хакасия'},
            {name: 'Томская область'},
          ],
        },
        {
          name: 'Уральский филиал',
          id: 6,
          regions: [
            {name: 'Курганская область'},
            {name: 'Свердловская область'},
            {name: 'Тюменская область'},
            {name: 'Ханты-Мансийский автономный округ — Югра'},
            {name: 'Челябинская область'},
            {name: 'Ямало-Ненецкий автономный округ'},
          ],
        },
        {
          name: 'Центральный филиал',
          id: 7,
          regions: [
            {name: 'Белгородская область'},
            {name: 'Брянская область'},
            {name: 'Владимирская область'},
            {name: 'Воронежская область'},
            {name: 'Москва'},
            {name: 'Ивановская область'},
            {name: 'Калужская область'},
            {name: 'Костромская область'},
            {name: 'Курская область'},
            {name: 'Липецкая область'},
            {name: 'Московская область'},
            {name: 'Орловская область'},
            {name: 'Рязанская область'},
            {name: 'Смоленская область'},
            {name: 'Тамбовская область'},
            {name: 'Тверская область'},
            {name: 'Тульская область'},
            {name: 'Ярославская область'},
          ],
        },
        {
          name: 'Южный филиал',
          id: 8,
          regions: [
            {name: 'Астраханская область'},
            {name: 'Вологодская область'},
            {name: 'Краснодарский край'},
            {name: 'Республика Адыгея'},
            {name: 'Республика Калмыкия'},
            {name: 'Республика Крым'},
            {name: 'Ростовская область'},
            {name: 'Севастополь'},
          ],
        },
      ];

      commit({
        type: 'setFilialList',
        filialList: filialList,
      })
    },
    getInitiatorList({commit}) {
      const initiatorList = [
        'Иванов И.И.',
        'Петрова П.П.',
        'Сидоров С.С.',
        'Кузнецова К.К.',
        'Смирнов А.А.',
        'Дмитриева Д.Д.',
      ];

      commit({
        type: 'setInitiatorList',
        initiatorList: initiatorList,
      })
    },
    getFunctionalList({commit}) {
      const functionalList = [
        {functional_code: '001',
          functional_name: 'RASANT'},
        {functional_code: '002',
          functional_name: 'Cross referencing DAB within RDS'},
        {functional_code: '003',
          functional_name: 'RadioText+ /RT+'},
        {functional_code: '004',
          functional_name: 'Enhanced early warning system'},
        {functional_code: '005',
          functional_name: 'Hybradio RDS-Net'},
        {functional_code: '006',
          functional_name: 'RDS-Light'},
      ];

      commit({
        type: 'setFunctionalList',
        functionalList: functionalList,
      })
    },
  },
}