import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../../../../api/user';
import { getCart } from '../../../../../api/cart';
import { getUsername, addToken,
         getCartItems, addItemToCart } from '../../../../../event/src/actions/index';
const dataUrl = `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAABtBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6Q29tcHJlc3Npb24+NTwvdGlmZjpDb21wcmVzc2lvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTI4PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEyODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6Yzg4OGMwZDEtNzk3YS0zYjRiLTk3YTctMGE4MGMyNDViZjY4PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MjM2REU4QURFRkM4MTFFN0E2QjA5RTU5NEYzRTU2OUI8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6MjM2REU4QUVFRkM4MTFFN0E2QjA5RTU5NEYzRTU2OUI8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnhtcC5paWQ6Yzg4OGMwZDEtNzk3YS0zYjRiLTk3YTctMGE4MGMyNDViZjY4PC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOmM4ODhjMGQxLTc5N2EtM2I0Yi05N2E3LTBhODBjMjQ1YmY2ODwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPGRjOnN1YmplY3Q+CiAgICAgICAgICAgIDxyZGY6U2VxLz4KICAgICAgICAgPC9kYzpzdWJqZWN0PgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxODowNDoxNyAyMzowNDo0NzwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjc8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CrUQEQMAACs3SURBVHgB7X0HfFzFue+ctqtdtZVkucoF28KmGBeqjYMhIQRMEsJ94DxarrkEXoAECOWScnk4eZfkklwS4F7IJT9qCJAACSkYEicEsDE4YINNccFVliwX9brltPf/ZnVWc7Zod6UtMvGAvHPmzJn6zTfffG0YOxKOjMCREfjHHQHpk9z1zs7OKinSU1NRW1cTCvXNLCkpLW3b3zCmPFB9m8dXHojvu6mHrf7ujh+X14zfFext7/KVVe/pad3XUa6VtUiBQEd8/k/C8ycGANqattd5y6pme0v8c2VVnWcz6WhZkqfYzK6QZcU/3MmyLDMoSVKXZVl7mWVtkyR7kx4Oberrat1WM2lm43DLHS3fHbYA0NDwflVNYOqpmkc5Q1HVxbKsHi/JSlWhBhaA0WmZ+kemoa81deM1s6f/7Yq6urZC1Z+reg4rAOhqbKyWA6XneD0l5yuKukRWtMm5GoiRlmNbVrNphNfquv5CV8+hv06YUN8y0jIL8f2oB4CHHrpG+8qldy9SNN+XFU39PNB59pNuRpgd6WYs3MWYGWJ2sJXZYTwzG/9b+JUZkyQmadgp/GOZpJYyVlKJ5zLGFG/W82Bb5r5IJPiyHup9+p77LlmzYsVrRtaFFOiDUQsAO9f/pXL80QuWeUrK/kVVtdNogjIJdt8BZnfuYHbLB8zq+JjZ3Q3M7m3G5HdGgcAyAQQRxiw9sThZiU64rDHJW8GYp4JJZROZVDGNydWzmDTmeCYFZjCpdELit0lSbACXaRhvGXrw0eYt7zw346TPAgJHV8hsVAvY5oMHd42rLB1zheb1Xi2rnqPTVW33H2TWgQ3M3vcGsw7ilyY/1I5JDkc/lTCp/I+6SiudkofqNmEFygPMYFMcAEN/FAgblFQzOTCTyeNOZNKk0/G7ICOAsPTIx7oRfjhi9D5WUTGxNVpg8f8daiQK2rrd770aGFc/b7nXV34T0PzUoSq3exqZtfdVZu75E7MPrGe06pkFLCur0T8JE52vQFsG1eXUhy1DHjefKdPOY/LUs4EtpgxZM7aHPaFg333B8KFHa2rqaR8qahgNACD3trde6iktu0PzeFOveL2PWY2Y9G3PM6vpdWb3H8LAofmKFl3hxRpGDhDYUoAtJH8tk+uWMOXoi5k85SzGNNASKYKhR7aGgz13lVWOeQpZOM5JkTWvyUUFgL7O5gUeX9W/q56S81L1kla3ue1ZZm7+JbPbt0bRMaHifK7yVI1Jl07AQFsPthypZjZTjrmMKbO+jC1ifMovI+HQn4I9HXcEaieuT5kpjy+KAgDr1//RP+eYM29XvSW3yAqR3ImBiDfzw0eZufXXIOT2Rlc6iLPDJhCRiT+pfDIHAmXOVdgeku9s2Bb69FDw7r3Na35UX790gHgpTE8LDgCdLc0n+isC92se36JkXbSDLczc9HM++XbvfsZUWu0g5A7XQASkEcZpYgJTjv0KU+Zdi61ibNLeGEZ4dV9n+83ABhuSZshDYkEBoK+n81qfv/w/JFnGGSsuYLUQmjc2/JTZHTsO/4mP6x4/SRAgVM1k6onfBDBcDoI1EaOBw9gd6u/+dml59YPxReTjuSAAsH3duoqp8+fcp3n8y5N1wjrwNjPe/D6IvNcGKflkGT8JaQMnCHnyEqYuWsHk8Scn7ZUeCT3esHfTjfX1p+X1pJB3AGjZt2tWoHbCY6pWsjChp0aQGevvYcZ7/81YpBerviQhyyc2wQiB0VTO1AU3ACPchL77Erpq6KF1nS37l9dOmr4t4WWOEvIKAN3dbQtL/RXPgtCri2+v3foB01+7FUe6NdGJH41UfXyjc/1MpwYAgjz5DKYt+U/OaYyvAgRiU6i372J/ZeW6+He5eM4bAIT7ey7C8e7nmPwECZ255SlmrPku58n/Q636VDMGIJD8Y5i6+C5+dIzPBrqg3QgHv+b1lz8X/26kz3kBgHA4eKmmeR+FHB0kvBDAgzfeXMGMjQ+AskfVEjh3R0J0BGziLtpMnX8dpw3ihVC2bYctS79SVb3P5HLIcg4A4XAYk68+JkmyR2yo3d/C9FeuZ9auFwf2u5xXLVZ3mMbBEARdJB+1lGlnP5jkuGiHQ6HwVT6fj7iHOQk5nYVwMHipp8T7KJa2a+XbHduZvupqCG3exuQPWzknJx0+LAox+vnpQDvnYRwb691NBiYwdWACb24wQc4AINzfeZHHV/kkWusi5a2WTUxfeTmzu3ZHiT13d448pRoBogsCRzFt6S+ZXDs3PlcoEuy6wusPPB//ItvnnABAV1fbaWWlFS+D4HMpWlqH3sPkX8rsnqaoKDXb1v2j54dcQSqvY9r5TzN57HzXaFim0Rnu6z9vpKeDEctNW5p2Hl1WVvGbhMnnK/8yTP6+I5PvmrosHiD0ovHTV17GCJOKgca7pLzseeKziOnZxkcEADvXr6+sGlv3JBQyJ4oV2507mf7SFWh8IybfRQuK2QofdzSB6Px9uASMH40jH0+MqxhAaE8Ck+2Jlq1vlIvp2cRHtAVEwsEnNE/JV8QKSU6v/3EZCD5IN0cRZ88mRhOxXYNtTO5tYla4h0lgy9oSKG9SAaMjKR+NEQ2JOBS5jRPDaPyJTPvCcwmng0io/wmvr3T5cCocdm8job7/o3n9/+OqFAqXEax8a+dKKEOMImofEjnbV8u0S95gsqcMOoL7mUWqY21bon8dW5HWxKQg2X5gSDLUP3T1vRAPdDrAEdFzPk6Bccqq/b0d10GA9LNsmzEsAOg41DSvsmbCakj1XKhHX/0tZr57/+iafBoRoH4Jq1+76M8M21XCGNmQRBqkVta1i1mv3gy9QqBaMR/pBjo6hpQe0zFMKCr/CXo/U068kWmf+qGrLhiu9Ia6284orRr7nutFmoesaQBS5igL1DwYP/kkyjU3QoKpJQo10rQh/69pz6+Gtpk4qWKt2AIUKG5I4+aBGwf1LpfSKFS9PKVMnvs1Js38ImM4l0vUR1L4wGQQ44Z/4yiOiuXmI466zfceYMROF4Msy2We0vL/bnzz2awmIHE5iKUmiR83a/HN8ZI9u/VDpr/xnejKcA1ekgIKniRB4c5mypg5KWsmNEh/ZsdOZvUdgraZsC5IfFtWx5Qzf4QcSNd7sV1A9RzYgvEtZDPUz7chrZFJoQFbg5Q15eIFbVEy09d8m/MHSFXdCZiXRWPnnnMznu9y0tL9ZgUAvUD93tKK212FgjjRX78VxBVUsfNN9DnUO9+jM929iMhTmVxzLE3fkIE4lgzKp65+kB1BYDoARI5+D2MRG0odpNjBpp3Dy7No9QN4Ir+/gLG+g3yChqxopC8Jk2G8SZrq+dLvXO3VfOXf6u04tLKsauzGTKpJNyaxMuxnn1W8gZof4ehRFktExHjvfihyrHY1Qnyfy7gNAo708kkD1wbqtUEUcSOPIdEv0L83wKTKo4ZsCsAEK/ojJjlA5uSm55rjXGq78aAngSYw6TRB1kbxL51ycv2LxWY1rebjLxZN8+P1V9xN8yWmp4pnjAH6PnfWl0u1ks+KBdng9Bnrf1qYyceES9iHtXnXAVWDgm/HZLWCeoemsAUFUhZq5fuxRAQbWfhwQg2/BBxlkxgbQjPX6ZPVBr2LeL0ErDYF2CPtvLZ/DKWWnsLyPQAENP7ylLO5gYrTD9XjPYfmC89PO2mpfjMCgO3rXqrw+ipWuAoBZa2/8W/RTucb9aNiQsHK2DlMhqkW/UlQoqBgETbA2Z4R0wnHORP0iN22GRT9btgOHMRfN7MrpyQcm/jH4j+E+nE0dBGKBEzQ7Zeqjh4SAAh70JGSG4sUkvFFwAqgM9bewTwXvOACPk9J+fcwby/Wn7aUCJOUISMAmHzC6ctVzVMvlmJueTqqw5dElUnMl5s4JlkrgXAkcSJkogegTMH/YKFDK5UmRIIxqEVsaKB1K4UWrtg2bj/Ytz+KPWIvQACWTmFyRd2QAEB1Wu0fJmKPWDl5jNBW0Pga1OefZspxy2MVwchm5uTjF16JhPtiiUkiaWmAjt27A+D2fVP81g61QXv3JxgsTUzOX5z2Yd8YqFZPTVsHTQZtfjIMO9WaY5h69EXMU3dGWgLQIgIQmIToCpvO/I7yZuU0HPtc7I7ENlB+EIF860l8m/8UzIOx/iewiQQmFIJWUnpzY+NHIJpSh7QA4BtXfaWseKaJRZDePlfdTnWuFjPnIg5KXC5HE3wuYWPSkgkAhhOIzaoufZIpJ+N4Nf18nPeJbwBhDIAoXbCI8u9pBgYg0CtCwDzQfJibHnJVDv8JU2qqJl3tSox7GHILaNu+rgIGHF8Xv7F79zHzg0dA+HnF5PzGSV2qBubZ8QRaDmuV/eOYPGsZLxFkIz/vWz17o74CoptKytrsrj3wN9AF+nG44Jey6MxfYD5oXsj4hETITvB4fNdgHn9Wk0K9fEgMoI2ZfhGgaLpTGP2aHzwMpkehoR3OG2rn82nAZuA6kolty1VcQQ0Kzvtq9bFM4eZcaSa2FaJaE0TkkJRCrlqXohxgH5Jx0PyIQdE807XaGXQiSBpSAoC9fr0Gnu814lck6TO3PFPY1U8NAGVtbf8tM9ffx8yGVdzpg9iu3MejE07/ppl6XrUN9qzkGwusEQR0EogWKRAWAHFu05YkBL+/4iqaTyEpFk3Zv56OljNLK2v+Bs3eWB4y4DBW/ysAoAiSPiK0aCsgXVMv3LeMP4UpC/8v2KEnpCXwYr3NU4ROHSZYw+bmp5j10SNM6gNPogBH46TdgXxCXXI3tIu/Ib62Qr2dZ/nKq1aLiRRPiQG8peWXi5NPgg9z85P4IikgxZeb+2cSf5IhMdUPKyLSLtb/cu2Ar5/cV5dNiSRtUCqnM8/CO5j2Ty8ziVjEJmGDbErJUV74SyDBHCMu6WDATl5yxeDjYCwpAHR07A4oinLuYDb0Z+8rUQZLsQBAbAyIQXLkJHXv4kc38VVx4qBRUDH9KdXHMOXzzzBpwc0AAEgWiZlUyID5IaaUufdVV62Kpi3tbGiociXiISkAeLXq8yA3B/90MJjbYJRS6M4MVp8khr2WuHRZip9hYAHvP/QfjvoDf0kKH3YSBwJgK23x/2PyaXeAJMC2xWsadpHZfwg6xNz2a9d3cLsz0VNd/jlXIh6SAoCiaheKGenoZ+1b42I1iu+LEidiq3QchEMJQD1kc2yQNATMxspLmPH2j5mxa2VUnBvpS46xhwH0UaIJVj4n38aUudeAdAH9UshARDNsLmnexKCqJRBXukMCH6Dh/fer4JbtdDGb1fBXxsBXLwrxJzZEjHMxLVy2xalGiVmSxWlyrEb4GILnEbbj98DbKgtDyij54calcgaTx8wGYQnFEEgAZZIggrJOukqSFS6kYZPiT8rCO5m9H97LWtZjAYF+saPpQtbcR4lfghMbzZty3D/Hylc8nk/t3v1e4Kij5nc6iQkAMG761FOhcjzRyUC/5u6XMVDDGQaxlFzHLfjuO56v2myGFNa2UPkC25c7gcSJAkGiEwaoeEo396xEmThT46TBqqYxaeKnmDJ9KZMnns4ZUVzaOHgwStMpm+sgSou+y6w/XAxRc5rsuXxNmA5e1EQAgNbQpAm1R52CalY5VSXMqqQqZzov6ZfO/tZBQO9oIP7EhmHlSmDTZjP5/PNwO5O69qI/IuyjFDwTNpFwxLWJy0mqXocgWYSOo/7CF1nkd19i+sH3sICzqTFKHKp1ZwKQFmIl6WIP8hvHfJFmdtSbmlOVBCTkPdN5ol8XAKxYsQKL37tYzGAdeGdAy6VIfG6xMbE49n8iAOG1M9tgQnfAAhCk1fyliSYgwXmeWNASTkHWHy5keuNrjFjF2SxmOLFm8swvgYbmTOZsmzy8/CSXgKIrOc8UA3wsLwYhHINiFwDcdv3143D2P078wN63FptmARsuVp4iLlkAgLLxXJEzRZbUye3bBs7IsTFInZe/oXw46ZPYG2pY9qu3YFW1ZI15OAaAR5DsQCdN09K9pu2OHHAIASquc1pbG2J+61wAoJT7jsNxYVDkBkqbYwAXuhRKK1LUBkeQVLwkDGim0+g0lSuLDIOy598Tdd0BW4KdMHHPIlAbZXgJkyDSLiirGPPGMYDAnpYVJVDmCxzrNN8FAEg8wXlBv1yjhrRfRxkA0CBKVbPFpqaNE8qGWgkUN7YCaEaynQEbkJl7VgHEIHQKJK2i8ABABjCg48Qgyepc59kFALKkzHde0C93vEzqVqPsBIDhZKz2eLGp6eOAAAtaQtIIAZpjHKiGZxeyxVPZlZ4yN80bHGfTPIoBx3ycc6MhBgA2CECg/1nOC/q127bSqIlJoyCOXQzcPznecUKalhHZwxla0PsfGUAD+xAqzyIQ9rGgu2frOH4XejGBCWW3fuRurSTNpvmmxBgAsDtvrMD+MFnMaUGfbtQF2s9INbx8SlZNozVodeyCriA0d7M6yrmr4QT02BPdiRk8ca5cMbApOk6GK2Lg83zjjdiPBADobumtxTNPdDJzH73FUnNyGhH/C8pWKp/KZAKCLAOpknNdvyy/i2UnczB47ZCnnR1LyjRi7X8bsiHaOgq8HZCiCHlnEYPNKrp1Pt+DGMAXGFeD864/lg+dtUlLttAoK9aAFBFQ8KSmbWfJmOJE4KGNYMbA9QoUNyza2jh1TG8yCNyUXGbqwu8xJQMbA7FELoDa+QfOTxDTCxIf0BTiBjQDFcL0zV9RO46voBg7zAj3TNW0wVXF79QJFWHPSjcqAAB5TAaGGvHlYJ65gefYBfwkIHN7vv2w5+vgQMGz09bAAZ5W6cBKJWkeGDg2bBHURXcyddZF8SWnfbZwmwnxUyQomRY8UJ9A/NogXCVlcH6DvT203f89BgBef3XA1bhIF1BWF5IGyQTX+yI9SEqUBZxtq0hf04PLHBj9IVjg/5v9Bzhb2CTmUCf+YFxi97cyiS6XIq4dWMJ2GayGJ5zKNKiXR/UDs+u4BZay8fe74IwC20chjUZizZS5wiq/MEvYNjHfbgzQ09ZUVVlbF/uMmz4TB3BgIQy+KGIMKNum27wgtRtJIKQvYTJU0BIMf0rdpwaLoz7TZBGzl+ifYU4a5zVh7PS372as6Q3OUh6spIAxmj/CYiTbEEJ3S8NkeowtJF9Z4Hbh/cDFS6PsCIhVKZXCSof0AEYQaExITBP9jcJ4LA6+vUT8f7B+CUhi6VnWR8fOyHv/xewN90WFS1l+n9PswHbxzCB/Zc0tVEdsC/AAAsRKOQ1AK0EuEZOLG6fVCSo8Wx2AQjaasIsN/Un97R8wC0q0XJDEwaiQrRDrAiQSAUvHXyHgOj4INwQAEN6N4iiYMGOiptq0MkdboMk36WKrdT9gdvObHJNE8ctoaCm1LjHEMEDiq1GYgj1ZqcmSBZzHbvDVjm3JglmY1byaq5qxxjVRgq8gRrNZdI4feRPzHz4AQFQVdADsYRCAZEIumDe4RmG4mMTC8dH84FFm7H4RJwmYouM6WhlN5MokwyQcXQ3L9UMKfs5hBADY/0txJCufmNXQ0CrVG/7C7A8fZmzsPJh7YQuBIokM+zm4PMmqLFdmOI6SYESq0M2lMMwkVTGuM+DKNJoeYvS+q1ExAIgEezo9vvLYiPC7c0mJkeu+DHeduOoa0QNp0yjQAZDJ3UsWJVFeqXkd0PPzTN7xIjNItA19QBM+BQzy/UPOH+BASiZnS7gSlnQMKCQfLv4q+h6cSBl3A7IlP2LG8cuZ+db3mLXrJXxITifTfT1YTv5jWALos0TudYSgh/u55UgMAPq6238MALjLySOV1OBDKE2SOdYoCOS7R6oahg4g2m53bMYYgMvtmGuBHcxg+Wt37mbWnr8gB1S+4NjSriCmz8lQAr2AMVzqJPN9nHBIMpAbTOMuZM5/hulw32a/9f3omBEPYbQE0nXEraZi6G7dfy89xwCgsnYqBP9CIIMLWi0GAGCwr0KGwkaxi8NW/9isKyVOnIWJJr28WOArFKtUxcpwEknLCKjcgnsZ+yNcaQObQ/Wkm6DL97+YEsvkZHb/0muFylzwDWZC88d65es4DoCHMhowAcEvuKfxKv1Vk2Y0UC9iuCoc7nIDAKFaUo0utFULtSpZwOqVa+qTvUmZRn2Pun5pBlqOwXqK/JhGADxhCglbn9TyPjNfvpLpa7/LTBKMcdZeik8HkgnEyCOJgrt/7KxVR4cue/hvgTlpHvlcDpYS7u3qpKcYAPh8/sbB1wBe2guJSEpxfBDz5j1O6B98bKliWtZVkU9gCe7bslXn5ixgouY33At3OPdm/D1hA3nOlXA2cUkUC2Td4hx/QIALdzkS2UEIQfX699JjDAC6uzvbbcsaZBgTMVM+CQgAChjFDsTLrgQLWBBmZNok0gGM8vYz/ULMh20H+6dFvhA7PxZfpIzz7QDDqp5yG1zaYN8t9gIi9jm2JVGmgXnut4KdrdSJGAAYhnIQrXVtA9HLjnH8KnagTgRmY0ulU0nmgW8B5DJucKfP/OOBnOQEkuz9rV0vZ/UtCayk+guBBcL4jlpSpEBjF485Jak7xH3rCQBQU1PTDYZJk9hMOUvNW/HbXMdl2OplHUiWQQ4cRQIw60LwARFzVE6WQSYAKDZTCLAnVcdpUFtmY+W9j5GsfxAD8L5Zxg6xjxKdc4vdATSIVr5UPSvrdUQ3kTO6rygtASj2OjFOXETJ7XAhMVNcCqFWdcxc+Bichi2oiFiUjFshPxEDXMtvk1as4Ht7bAugDIZhbhQzSsQYIX5AEfcxzmErCUALGAwbsXEZxO2uBq4WjSNABrlTZ4G1PRRRMQ5ZBslbDtb19OKNH80bzOfjTehgIBubZxcAIH/sBfWV7rnnHxMRVpCQuFfatg4FkOlR97DZtgGEm23RHjwyAKDvbfAFhhXAcSyoTaDYSMybHKjHPLr1JwwjEptnFwD0Btu34J5avjfwcrD3yXDGNCJNWrFBQ8VplQLVk5dOm/z2wg09/ZFzBWnmBXiX7hyfWLhF3jszOL8nfimkYFVIoOblusVCYmZRAmducZwI15kVMNJcBADjT0IjBqcZq7+rr6MHR6NoGHyD5wceePSAZZofOS/pV5q0aFiDL5aRNg5KlZVOYPKFv2fa559m6unfY/Ix/5vJ9f/ElM88wJQTrklbRNIMkNKNdO2TKpU068twFjE9aRVDJVLdBMzZ8SCGKjHLd8TYmuQGXMsyPqypq2t2SnItK5iHW9++/dbVTPNg1qNBHnciHDGPxV6KE2K++NuAVELz6vhTo1Tp9C841Y/o10KbySEEvwNAWAUZFwrCz4ILWd8p/zpMQMLSp7uIhlN3xo1MkZEvqvG4BgfzJwTTNN7AzSIxnOTCAJTPjkTWCPn5/sHRCFeUFN/kMI7G2vCuleugzL0WGGwhs8EJI4tirhhJypHEp6cBwrmC/qPfwYA40Ty0DU1czDzn/iJrUzAqi5dKavXAQnIxAADzRfNGdJwYQuH+18VnFwagFwc7m96qKy1vFt3EKEedx6ydfxS/y2mcBD10VBkxuo5rlTrjC7hm7VxcvLgf1jGgB9oh6GmB1w+ogXNTrXAn3MOAzuDcTmAKYDgbcgAbYmJ19iVMxQUV8oB4OK7otI8EAEbLRmb1ZyKHSFtc9hlA+yjTznV9h+tmmzsbDqwTExMAYOrUEzrC4f61HkW92MkoTz0b2wAoSQxYPtAZ18DN0tjTadtQvwRQxENQcGEEXRohTTkrujJp9ZOdHjm+gltVi1YqnTbI4RRuF5FI6jgM3wPxbbF3/A78AzCjIHUsaKDjH1a+PPXTrmpNy3pl6gkndIiJSVuG68lfYB5fDAAkDApRwdbHv0VnSsTvRxyn/dmCrFqJZ1eOuORoAc4e52AXDhREyxBqpD9SBslRXWIxVvceZu8A1iwGIw0nKQV3JEi47UwMkWBfAj87ad/bG7euInQhfqyQK/URMlTE8pw4XdrIyNsHdP2dSXLeHY6/hPqJxWa+cw8wDBGAJCQucECdCk4uYsB87u/o7vuzmEbxpABQd8ypbaYeWSVmVqZ8Oooac00M0gABBRsfPc6M5re4QWrUu2a0dhpQCpyoikZH8b/R1hofv8CsLb8EtoRSTaHBGvNDW5iM7U4Mphl5efLkye1iGsWTbgH0IowLiVVvyT9Dvy26MKEooYAwMtZ8hzNsKE9OAs6qEgw1rVeuZyb2YB0iXxn2eHRDpww3cAyd4dxIYAg13dUtOWnQ8AsBywhAvJYZr98MDWEAA8eYDggPv9ysvoQrOuWYSweAL/oliFwr3N/1RLJyUgLAtp2/XTt3zlfeUT0lpzgf0jZA15badEVbLlEbyrIVeP3AOrfhicuCTxsJfnhwOIwCGx3j4BXMrIRGEARUKtkGVM2AN4NpoNKh7JCHrcnpcya/zhQb8EBqrrqaycQzIX3KQgcQtxKuwFVmu9E/Vv876zduezNZc4bcdoN9fVeV+P0Pix8ab97JfewW9HZwompxVLMZGEZEwQNgLEj41HMeZNqsS4dAsjQ1YhedqRLTxN5lEx8s20L79A8fZybGRoYpdtGcatJdAWBaqYtWuDrS39P11dKKwCOuxIGHpDSAk7E/FHoOrOFdzjP9KnOuBsE2HpsyJqJQgRgpZBau4ARCdwaQlivSZLLuHSIQFjbgGNLo+JiZRi8wigQCLReTTzQJXLGibgOONCMrL2fsVSiQkvOoLJVWhmh+dq9o9UPzR5nzVdd3oOV2Nh/c+pwrUXhIuQVQHlIS6e/tfMhXWnm38w1dSKTM+RdmwP6toFjAaQD9YsXJvhrw56F1I6bHxYkHb6yHPt+WJyEVw5aBP+5eFlxH4pEr3Mp4qBKixGdcsbC0PcDM5r/D1uBZZje8Ao8jmHgCzqGLii8mt88QmpFfYPHCKKogEgk9UJ/iwih6PyQAUIbuAw2Pe6cde6OLMwgWK+98915AfNoiqJicBhKv2nTdO10YOUTg2wVuE5VIqkhOIOAti5gzhLK1C37HuYRDzZkNPr4JnUJb78GRrhXcxD0o4wNmkvMsXNDEbRWIeQTeiLO5DNGc/L0iWQq4l8T6FgMku3v0jqYnxLT4eNrZGz9z7qFQf8/dXl/Zfc7HElYf+cKnK1uKAQDEq1dwSkin6m3RVW5kAEIWTkS0AlhJvVsis640nEeaUP39h7ilL99yaMujPYX8BxDQF4PB40xA/C+OfupJt2JB1Lre6OHgTysnH5dw9BMzDUkDOBn3bV73hKFHtjvP9KvMhrh28pnYBCG3L3DgqzYTK2GafBhtorWxFkpg+bLSifiDpCyW6o7Q5NNc262bOSuZHEXwMz2shwgYcnoCcled/RPGXwaPRjn2Mte34KV83LfvwOOuxCQPGQHAjJM+2xUOdt/p+h7Ejrb432E7UIGRIt5XAQPqljOQHprtcJMKynhwpjHlOE3IJOyBpXGUZ5fYbgIMcqrEBUhF2OISW5QihcYd40/X08QTn6Fgz4qa+nocSYYOGQEAFfHSn6971giHXNxBiaxtT/xmYbEA73Ql+AAzh+4Z3kptW5jsUsiktQ0AiGkYp+6+1dcMQRH+csnvSNviLDNg9asLbsSlmvNcH0bC/X9+8aW/PutKTPGQegTiPli27Dmzt7vtdihYgOQdDHQ/nQxDyoJtBRwAqkB0EY5Og3nIs3fcBNpY0XQSSBekTtwggnuEoty8dLmL8J5QP5xbqQtucFWOY3tff1fH7cuWLcvonJ6WCBRLrxpbtzHY3f7DkvKqu2LpoIC1M+9h4d8sjYqL840yqXw4sLR+cx4LwXJJqprFVzTxv7kLeTragW1tgTAyyUmyyyYABCA4jukIQN43UPokqMrWGCU2LvmMkMIKCD7trJ9GaROhLkPvv6tqXN0mIWnIaFYAQCUd2LDpJ3WLTjsfLOJFTsk0+NoZP2D6qq8hidBsKvLK+WKEv1j55PWKPJnasP0nPCDxG0UrmAzdQpIjWMSswlHNBQDY/6VKpEP6SIG3NEVzyUoYRuM83+j6hxpsY7z/IyqcExpnGvqbzes2ACoyD8PqYcehpnkV1eNXw+lwuViVDkGRCUPKYjKI+LZAK4Sml+suCF1Eug0DE/XT94OJNI07nZZBUAo5eHdo5Yef/QzuDMJC4k4yxF4WOQ49RQV0lwYLZDFA3NvT3X7wDMLSYnq6eHzf0+WPve/raf+av6zqZ7EEikARIfLS5VAfW1k8IHA1KMkDne9IeOSDo0wwkxi2EAVEIZlP8S0ELmFtCHMiz0Chgt8tNHiETFJaYZNwopFnfJF5lj4RPY4Ktfd2dVxbHqj+HyEpo+iwAYBKNyLBx3An7XKxJrpPR//jxfzGqlxrD4n1jCwOICACkguYwBew8EzyBUgWrXLw0z0BZh98F1UgfbQEIvqg5Kl98TlupyA2KxLqewKMuuViWqbxjE8ByQrcsWvDDYYe+rv4jrhR2uce5azJqGWs+Ha0xAH3dDogRxAKHELQDWREXOLsL7eB9QvFlFE1+cCspBOhnYtxJZNzIWD813U3NH1DSMoqOiIMQDV1HWqsL6uZ8BrdTSvWbLVsYvqLl0AjtwkDDU7akTC8EYAKOwl4PJ//Fc77J7jKsMxIU09bw5LAuKN3uV5k8TBiAKC6urvbFpaVVr4EPzwBsW4L/vn1lZcCCBoT9iwx35F4ihGglQ86RTv/aSaD6SYGCHo6w+G+c/3+ShcGFvNkEh/RFuBUUFFR85Ye7r0azy7BADXaQ1epE8WNPexIyGIEMF5kLUUrP37yIagIGRjvkU4+tSYnGMDpVrC393Kv3/8IVLRcON+G9y191VdBGL7NmTRO/iO/KUYARz2Z7ij43CMcCMRckGaGdT10pdfrf0ZMH248pwBAjQgGAQTeJEAAZw36X7/OrF3QlS+GtuxwR6ig3+HUAdM1GRZN2mfgaTyO4ANhGg6Fwlf5fL6nctWsnAMANQxAcNkAEEB2KgQQNFyncOOD0bP4CD13CCUf/lGyXQSPQp13fVSnL55wBtqHZc+Vqqr+KpedzQsAUAPD/T0XgV38c2gSVcU32NzyNFcv57L6HFsaxdd1WDzTfg/tJnXxD6Iq3XGNtk2jQ4/0XeP1B56PezXix7wBALWsH6cDr7/8V7KiTYlvqQ3VKv3125jVuDrKsi2GBW18owr9TMwoGKfKuMdIW/Jj+CyGuntcgPS1obez7dKKmnFvxr3KyWNeAYBa2Hlw74zSqvG/UDUtJjyKtRyQb7x7P/4gPyB1alKs/EcJ5K8YnEf1xJuYOv+GAbmFu/PQwnqrr+PA5YFxU4d9zneXmPiUdwCgKrdufaN8+lHz79c8/uWJTQAnFnfcG2vvADZ4ParZkm+RcrJGFCqNBFX4Ix0K9fTvM+6AI0ndYO8+Dg7fDbWzZ0MjNX+hIADgND/U03Wd5i/9IbiGFU5a7BcEorn5SWADXLKEYyNd2TaqtXFiDc8wQkql5O8ImkykRaUce3mCGheVBAZPd6i3+9ulldWglPMfCgoA1J3OzpYFpf7ye1XN+6lk3SPffuamnzPzw8eijp4Pd0BwJp7sKY6/Ev6OYFiT4vJpUw+v7u1qvzlQO3FDsrHJR1rBAYA6sXv3qyXjx86/BTdXfQvYoCxZx+jeYvPDR5i59VdRVjJZ3NDf4RKgU8BgqClVTAFlfxmf/HijDacrkOX3Gnrwh3ub3rinvn4p+bUrWCgKADi962zZe1JZYOxdiuo9x0mL/+XGGdt+je3hKRh3bMVZGZQznZFH46mBU/WYP0ga6XYzstJVjl425D2HULT9U1/PoX8L1E4t2KoXx7ioAEANWbGCybd+s/Uyr6/8O6rmmS02zhWH0yZr79+4RRK/ixcqYRjp4gMDoXisdBIfk5MLOtIpuDOAdPWjHE9XL2IPlh7ZGgz23VVWWf00EgHVxQlFBwCn2zt3rq+cMG7Gcq+v9CaoaU1z0pP90vbAgWHPn6C4sQG6gQc5Zc2tlOgEkU/swBVJopQ81UeGshIUNRQ4o5Inw4kG9vqhAoi8HWCS/df+QzufmDHjpK6h8hbi3agBAKez+7e/W1s1aeYVquq9VtE8M530VL80+XSMtOGYwYKlrk3q3GQNRNfDUyDFDwIIDhT0yxP5q+T/kLYQvcGipMl2/igRt3+TWRzZ4cnjT4YLutP5MS7eFWuyci1D327qwQf6Wxp+EYAjrmR5ipE26gDAGQTCCONrj1oGQvFKRdUWZuoEgmgGu2M7bj7YzK+JJ10Efm0M7vnjt6GToQgBB0fbTm0Dv4Q9iL6glc2vWcG1OdAyJpk8d2PHvZXM5Ks+7sukj/DMYZumvhaqc482b13/W7KwSpqxiImjFgCcMXl1xQrc3fT1M7wlvksU1XM+ZAvQ+84ygMfA784lN3eQttmhdsjV4q2myGgUSs60wumGMXgol8glTbxQJoOqLVNv1HX95WBv9zP3PTBh9YoVxdvj0zV31AOA2IEDO3aMrRg3ZonH67sQrosWQ8YwWXxfzDiOck2mZfwtHAy+3Nm9f9XkNFa5xWyrWPdhBQBiwzsb3q9SA5NOVTRtiaZ5TodS5/HgKSRIHsVvchnHhHeCoPsIv2tkpqzqb921KZ0pdi7rz1VZhy0AxA9Aa2vjpNKS8tmq6pknq+p8AMR0UHBTkC8AdzJkCjysgH28D4RjD1TH9xqWuV2yzHcN3dzY33Xg45q6+qZhFTqKPvrEAECyMbXt9srulr7aitq6mkiwd4rHV1Z1qGnXxKoxY2/RSsoSOJC4TlWHCPs/K2sn7wn2tnf5yqr3dHUdaq1k3nYpEBg1lHuyvh5JOzICwxqB/w+NhCDczXgdEwAAAABJRU5ErkJggg==)`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAmazon: false
    };
    this.addToCart = this.addToCart.bind(this);
    this.hoverState = this.hoverState.bind(this);
    this.unHoverState = this.unHoverState.bind(this);
  }

  componentDidMount() {
    if (document.location.host === 'purse.io' && (!this.state.token)) {
      const showAmazon = false;
      this.setState({ showAmazon });
      document.cookie.split('; ').forEach((cookie) => {
        const cookieKeyVal = cookie.split('=');
        if (cookieKeyVal[0] === 'purse_token') {
          this.props.dispatch(addToken(cookieKeyVal[1]));
          this.props.dispatch(getUsername(cookieKeyVal[1]))
            .then(() => {
              if (document.location.search.match(/amazon/g)) {
                const amazonUrl = document.location.search.split('=')[1];
                document.location = amazonUrl;
              }
            });
        }
      });
    } else if (document.location.host === 'www.amazon.com') {
      const showAmazon = true;
      this.setState({showAmazon});
      this.grabAsin();
      this.grabPrice();
    }
  }

  grabAsin() {
    const asin = document.querySelector('[data-asin]').getAttribute('data-asin');
    if (asin) {
      this.setState({asin: asin});
    }
  }

  grabPrice() {
    const priceStr = document.querySelector('#priceblock_ourprice').innerText;
    const priceNum = parseFloat(priceStr.replace(/\$|,/g, ''));
    const fivePercentOff = (priceNum * (1 - .05)).toFixed(2);
    const thirtyThreePercentOff = (priceNum * (1 - .33)).toFixed(2);
    const percentOffText = `$${thirtyThreePercentOff} - $${fivePercentOff}`;
    const buttonText = <p>Pay <strong>{percentOffText}</strong> with Bitcoin</p>;
    this.setState({ buttonText });
  }

  addToCart() {
    const newItem = {
      asin: this.state.asin,
      quantity: 1,
      country: 'US',
      variation: true
    };

    this.props.dispatch(getCartItems(this.props.token))
      .then(() => {
        const body = {
          country: 'US',
          name: 'Cart',
          id: 1,
          items: this.buildCart(newItem)
        };
        this.props.dispatch(addItemToCart(this.props.token, this.props.username, body))
          .then(() => {
            const buttonText = <p>Added 🤙</p>;
            this.setState({ buttonText });
          });
      });
  }
  
  buildCart(item) {
    const itemId = item.asin;
    const itemExists = this.props
                           .cart.findIndex(cartItem => cartItem.asin === itemId);
    if (itemExists < 0) { // Item was not in cart already
      return [item, ...this.props.cart];
    } else { // Increment quantity of existing item in cart
      const itemIndex = itemExists;
      this.props.cart[itemIndex].quantity += 1;
      return this.props.cart;
    }
  }

  hoverState () {
    const buttonText = <p>Add to Purse List</p>;
    this.setState({ buttonText });
  }

  unHoverState () {
    this.grabPrice();
  }

  navToPurse() {
    const amazonUrl = document.location.href;
    document.location = `https://purse.io/shop?ref=${amazonUrl}`;
  }

  render() {
    const isAmazonAndLoggedIn = this.state.showAmazon && this.props.token;
    const isAmazonAndNotLoggedIn = this.state.showAmazon && !this.props.token;

    const buttonStyle = {
      display:'block',
      padding: '10px 10px 10px 38px',
      color: '#555',
      marginBottom: 15,
      backgroundImage: dataUrl,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 20,
      backgroundPosition: '10px 50%',
      textAlign: 'right',
      borderRadius: 4,
      outline: 'none',
      border: '1px solid #ddd'
    };
    return (
      <div>
      {isAmazonAndLoggedIn &&
        <button style={buttonStyle}
                onClick={this.addToCart}
                onMouseEnter={this.hoverState}
                onMouseLeave={this.unHoverState}>
          {this.state.buttonText}
        </button>}
      {isAmazonAndNotLoggedIn &&
        <button style={buttonStyle}
                  onClick={this.navToPurse}>
            <p>Log in at Purse.io</p>
          </button>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    token: state.token,
    username: state.username,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(App);
