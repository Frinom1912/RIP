from operator import itemgetter


class Street:
    """Street"""

    def __init__(self, id, name, city):
        self.id = id
        self.name = name
        self.city = city;


class House:
    """House"""

    def __init__(self, id, house_number, num_of_citizens, street_id):
        self.id = id
        self.house_number = house_number
        self.num_of_citizens = num_of_citizens
        self.street_id = street_id


class StreetHouse:
    """Дома улицы"""

    def __init__(self, street_id, house_id):
        self.street_id = street_id
        self.house_id = house_id


# Улицы
streets = [
    Street(1, 'Арбат', 'Москва'),
    Street(2, 'Крестьянский проспект', 'Голицыно'),
    Street(3, 'Славянская', 'Игнатьево'),
    Street(4, 'Невский проспект', 'Санкт-Питербург'),
    Street(5, 'Ладожская', 'Москва'),
    Street(7, 'улица Баумана', 'Казань'),
]

# Дома
houses = [
    House(1, '2/1 ст.6', 100, 1),
    House(2, '227/1', 120, 1),
    House(3, '53 к.3', 250, 2),
    House(4, '16', 190, 5),
    House(6, '12', 122, 7),
    House(7, '2', 228, 3),
    House(8, '1', 123, 3),
    House(9, '4', 555, 3),
    House(11, '19/1 ст.2', 0, 1),
    House(12, '22/1', 500, 2),
    House(13, '11 к.2', 120, 2),
    House(14, '19', 700, 4),
    House(15, '42 ст.1', 12, 4)
]

street_houses = [
    StreetHouse(1, 1),
    StreetHouse(1, 2),
    StreetHouse(1, 3),
    StreetHouse(1, 4),

    StreetHouse(2, 3),
    StreetHouse(2, 12),
    StreetHouse(2, 13),
    StreetHouse(2, 7),

    StreetHouse(3, 7),
    StreetHouse(3, 8),
    StreetHouse(3, 9),

    StreetHouse(4, 14),
    StreetHouse(4, 15),
    StreetHouse(4, 2),

    StreetHouse(5, 4),
    StreetHouse(5, 12),
    StreetHouse(5, 13),

    StreetHouse(7, 6),
    StreetHouse(7, 1)
]


def main():
    # Соединение данных один-ко-многим
    one_to_many = [(h.house_number, h.num_of_citizens, s.name)
                   for s in streets
                   for h in houses
                   if h.street_id == s.id]

    # Соединение данных многие-ко-многим
    many_to_many_temp = [(s.name, sh.street_id, sh.house_id)
                         for s in streets
                         for sh in street_houses
                         if s.id == sh.street_id]

    many_to_many = [(h.house_number, h.num_of_citizens, street_name)
                    for street_name, _, house_id in many_to_many_temp
                    for h in houses if h.id == house_id]

    print('Задание А1')
    res_11 = sorted(one_to_many, key=itemgetter(2))
    print(res_11)

    print('\nЗадание А2')
    res_12_unsorted = []

    # Перебираем все компьютеры
    for s in streets:
        s_houses = list(filter(lambda i: i[2] == s.name, one_to_many))

        if len(s_houses) > 0:
            s_citizens = [num_of_citizens for _, num_of_citizens, _ in s_houses]
            s_citizens_sum = sum(s_citizens)
            res_12_unsorted.append((s.name, s_citizens_sum))

    res_12 = sorted(res_12_unsorted, key=itemgetter(1))
    print(res_12)

    print('\nЗадание А3')
    res_13 = {}
    # Перебираем все отделы
    for s in streets:
        if 'проспект' in s.name:
            s_houses = list(filter(lambda i: i[2] == s.name, many_to_many))
            s_houses_numbers = [x for x, _, _ in s_houses]
            res_13[s.name] = s_houses_numbers

    print(res_13)


if __name__ == '__main__':
    main()