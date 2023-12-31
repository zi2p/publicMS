# -*- coding: utf-8 -*-
"""1 Кинематика (продолжение).ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1gTc5h6_piRxTs0h_b887BWYiS3G_Ka2t

1.4 Баллистическое движение
Задача 1.4.1 Необходимо написать программу, которая бы определяла время полета, максимальную высоту полета, дальность полета тела по заданным значениям начальной скорости и угла броска к горизонту.
На вход подаются абсолютное значение скорости и угол броска, на выходе получаем все данные о полете + построение уравнения траектории (x(y)).

---

1.5 Кинематика вращательного движения
Задача 1.5.1 Написать программу, которая бы вычисляла угол вращения тела от времени. На вход программы передаются начальное значение угла в радианах, начальное значение угловой скорости в рад/c, а также произвольная зависимость углового ускорения от угла поворота, угловой скорости, а также от времени. Программа должны возвращать значение угла поворота в произвольный момент времени.

---

1.6 Плоское движение АТТ
Задача 1.5.1 Построение уравнения траектории точки на ободе колеса - циклоида.

---

1.7 Тангенциальное и нормальное ускорения
Задача 1.7.1 По заданной кривой(параметрически) найти кривизну кривой в заданной точке. На вход программы передается параметрически заданная кривая на плоскости и значение параметра, при котором необходимо вычислить значение кривизны, а на выходе получаем собственно саму кривизну.
"""

#@title Баллистика

import matplotlib.pyplot as plt
import numpy as np

#@markdown Введите начальную скорость:
v0 = "10" # @param {type:"string"}
v0 = eval(v0.replace(',','.'))

#@markdown Введите угол броска в градусах:
phi = "60" # @param {type:"string"}
phi = eval(phi.replace(',','.'))

#@markdown Введите угол, куда дует ветер:
phi2 = "180" # @param {type:"string"}
phi2 = eval(phi2.replace(',','.'))

#@markdown Введите постоянное ускорение от ветра:
F = "19" # @param {type:"string"}
F = eval(F.replace(',','.'))

#@markdown Введите коэффициент сопротивления воздуха:
k = "0.7" # @param {type:"string"}
k = eval(k.replace(',','.'))

#@markdown Учитывать ли сопротивление воздуха (F_d = -kv)?
vis = "\u0414\u0430" # @param ["\u0414\u0430", "\u041D\u0435\u0442"]
vis = vis=="\u0414\u0430"

#@markdown Учитывать ли ветер?
res = "\u0414\u0430" # @param ["\u0414\u0430", "\u041D\u0435\u0442"]
res = res=="\u0414\u0430"

#@markdown Введите уровень, с которого совершается бросок:
h0 = "5" # @param {type:"string"}
h0 = eval(h0.replace(',','.'))

#@markdown Введите уровень земли:
fl = "3" # @param {type:"string"}
fl = eval(fl.replace(',','.'))

phi = (np.deg2rad(phi))
phi2 = (np.deg2rad(phi2)) + np.pi
vx = v0 * np.cos(phi)
vy = v0 * np.sin(phi)



X = [0]
Y = [h0]
g = 9.81
dt = 1e-5
X.append(X[-1] + vx * dt)
Y.append(Y[-1] + vy * dt)
while Y[-1] > fl:
    vy += -g * dt
    if res:
        afx = F * np.cos(phi2)
        afy = F * np.sin(phi2)
        vx += -afx * dt
        vy += -afy * dt
    if vis:
        afx = k * vx
        afy = k * vy
        vx += -(afx * dt * (vx >= 0)) - (afx * dt * (vx < 0))
        vy += -(afy * dt * (vy >= 0)) - (afy * dt * (vy < 0))
    X.append(X[-1] + vx * dt)
    Y.append(Y[-1] + vy * dt)
fig, ax = plt.subplots(figsize=(12, 6))
ax.scatter(X, Y, s=2, c='r')
print(f"Затраченное время: {dt * len(X):.3f}\nДальность полёта: {X[-1]:.3f}\nМаксимальная высота: {max(Y):.3f}")
plt.title('Баллистика материальной точки')
plt.xlabel('x')
plt.ylabel('y')
plt.axis('equal')
plt.grid(True)
plt.show()

#@title Вращательное движение

from numpy import *
from bisect import bisect_left

def take_closest(myList, myNumber):
    pos = bisect_left(myList, myNumber)
    if pos == 0:
        return myList[0]
    if pos == len(myList):
        return myList[-1]
    before = myList[pos - 1]
    after = myList[pos]
    if after - myNumber < myNumber - before:
        return after
    else:
        return before

phi0 = 0
w0 = 0
x0 = 0

#@markdown Введите зависимость ускорения a от угла x, скорости w и времени t a(x, w, t):
def a(x, w, t):
    a = "sin(x) + sin(w) + sin(t)" # @param {type:"string"}
    return eval(a.replace(",","."))
#@markdown Введите исследуемое количество времени
t = "10" # @param {type:"string"}
t = eval(t.replace(",", "."))
#@markdown Выберите исследумый момент времени
ta = "5" # @param {type:"string"}
ta = eval(ta.replace(",", "."))
if ta < t and ta >= 0:
  dt = 1e-4
  time = arange(0, t, dt)
  i = time.tolist().index(take_closest(time, ta))
  X = [x0]
  W = [w0]
  for tt in time:
      X.append(X[-1] + W[-1]*dt)
      W.append(W[-1] + a(X[-1], W[-1], tt)*dt)
  print(f"Значение угла материальной точки в выбранный момент времени: {X[i]:.3f}")
else:
  print(f"Ошибка! Исследуемый момент времени должен быть в исследуемом отрезке [0;{t}]")

#@title Циклоида

import numpy as np
from numpy import pi, sin, cos, linspace
import matplotlib.pyplot as plt


#@markdown Введите время движения колеса:
tf = "10*pi" # @param {type:"string"}
tf = eval(tf.replace(',','.'))

#@markdown Введите радиус колеса:
r = "1" # @param {type:"string"}
r = eval(r.replace(',','.'))


t = linspace(0, tf, 2000)
x = r * (t - sin(t))
y = r * (1 - cos(t))

fig, ax = plt.subplots(figsize=(10, 5))
ax.scatter(x, y, c='r', s=2)
plt.title('Траектория точки на ободе колеса (циклоида)')
plt.xlabel('x')
plt.ylabel('y')
plt.grid(True)
plt.axis('equal')
plt.show()

#@title Кривизна

from numpy import *
from matplotlib import pyplot as plt
from bisect import bisect_left
flag = True
#@markdown Введите зависимость x(t):
def x(t):
  x = "sin(t)" # @param {type:"string"}
  return x.replace('^', '**')

#@markdown Введите зависимость y(t):
def y(t):
  y = "cos(t)" # @param {type:"string"}
  return y.replace('^', '**')

#@markdown Введите левую границу исследуемого отрезка:
t0 = "-pi" # @param {type:"string"}
t0 = eval(t0.replace(',','.'))

#@markdown Введите правую границу исследуемого отрезка:
tf = "pi/2" # @param {type:"string"}
tf = eval(tf.replace(',','.'))

#@markdown Введите точку из отрезка:
ta = "pi/3" # @param {type:"string"}
ta = eval(ta.replace(',','.'))


if t0 > tf:
  print("Ошибка! Левая граница должна быть меньше правой. Границы поменялись местами.")
  t0, tf = tf, t0

if t0 == tf:
  print("Ошибка! Границы не должны совпадать. Выберите другие значения.")
  flag = False


def curve(t):
    return eval(x(t)), eval(y(t))

def take_closest(myList, myNumber):
    pos = bisect_left(myList, myNumber)
    if pos == 0:
        return myList[0]
    if pos == len(myList):
        return myList[-1]
    before = myList[pos - 1]
    after = myList[pos]
    if after - myNumber < myNumber - before:
        return after
    else:
        return before


if flag:
  t = linspace(t0, tf, 2000)
  if ta < t[5] or ta > t[-5]:
    print("Ошибка! Выбранная точка должна быть в интервале!")
    flag = False

if flag:
  fig, ax = plt.subplots(figsize=(10,7))

  X, Y = curve(t)
  dx_dt, dy_dt = gradient(X), gradient(Y)
  d2x_dt2, d2y_dt2 = gradient(dx_dt), gradient(dy_dt)

  curvature = abs(dx_dt * d2y_dt2 - dy_dt * d2x_dt2) / (dx_dt ** 2 + dy_dt ** 2) ** 1.5
  ax.plot(X, Y, color='b')
  ax.set_aspect('equal')

  i = (t.tolist().index(take_closest(t, ta)))
  print(f"Кривизна равна {curvature[i]:.5f}")
  r = 1/curvature[i]
  dydx = gradient(Y)[i]/gradient(X)[i]
  angle = arctan(1/abs(dydx))
  ax.add_patch(plt.Circle((X[i] - sign(dydx)*cos(angle) * r,
                  Y[i] + sin(angle) * r),
                  radius = r, facecolor = "white", ec = "black"))
  ax.scatter(X[i], Y[i], marker='o', color='r')
  plt.legend(["Функция", "Окружность кривизны"], loc ="lower right")
  plt.xlabel('x')
  plt.ylabel('y')
  plt.grid(True)
  plt.axis('equal')
  plt.show()