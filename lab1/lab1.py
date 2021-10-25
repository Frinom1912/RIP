import sys
import math

def getC(index, prompt):
    try:
        coef_str = sys.argv[index]
    except:
        print(prompt)
        coef_str = input()
    coef = float(coef_str)
    return coef


def getRoots(a, b, c):
    result = []
    D = b*b - 4*a*c
    if D == 0.0:
        root = -b / (2.0*a)
        if root > 0.0:
          result.extend([math.sqrt(root), -math.sqrt(root)])
        elif root == 0.0:
          result.append(0)
    elif D > 0.0:
        sqD = math.sqrt(D)
        root1 = (-b + sqD) / (2.0*a)
        root2 = (-b - sqD) / (2.0*a)
        if root1 > 0.0:
          result.extend([math.sqrt(root1), -math.sqrt(root1)])
        elif root1 == 0.0:
          result.append(0)
        if root2 > 0.0:
          result.extend([math.sqrt(root2), -math.sqrt(root2)])
    return result


def main():
    try:
      a = getC(1, 'А:')
      b = getC(2, 'B:')
      c = getC(3, 'C:')
      roots = getRoots(a,b,c)
      len_roots = len(roots)
      if len_roots == 0:
          print('Нет корней')
      elif len_roots == 1:
          print('1 корень: {}'.format(roots[0]))
      elif len_roots == 2:
          print('2 корня: {} и {}'.format(roots[0], roots[1]))
      elif len_roots == 3:
          print('3 корня: {}, {}, {}'.format(roots[0], roots[1], roots[2]))
      elif len_roots == 4:
          print('4 корня: {}, {}, {}, {}'.format(roots[0], roots[1], roots[2], roots[3]))
    except:
      print('Неверный формат')
    

if __name__ == "__main__":
    main()
