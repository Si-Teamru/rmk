"""Шрифты сайта -> src/app/fonts/*.woff2: латиница, кириллица, типографские знаки (подключение — src/app/fonts.ts).

- Hauora (OFL, Wayne Shih): в npm нет, исходники — установленные в системе otf, начертания из стилей Figma.
- Unbounded (OFL): variable-шрифт из github.com/google/fonts/tree/main/ofl/unbounded (Unbounded[wght].ttf).
  В нём нет неразрывного дефиса U+2011, который ставит типограф, — добавляем его на глиф обычного дефиса.

Запуск: npm run fonts -- <папка с Hauora-*.otf> <Unbounded[wght].ttf>   (pip install fonttools brotli)
"""
import os
import sys
from fontTools import subset

if len(sys.argv) < 3:
    sys.exit(__doc__)
hauora_dir, unbounded_ttf = sys.argv[1], sys.argv[2]
out = os.path.join(os.path.dirname(__file__), '..', 'src', 'app', 'fonts')
os.makedirs(out, exist_ok=True)

# Базовая латиница + Latin-1, кириллица, пунктуация (тире, кавычки, U+2011), №, ₽.
UNICODES = subset.parse_unicodes('0000-00FF,0400-045F,0490-0491,2010-2027,2030-203A,2116,20BD')
NBHY = 0x2011


def build(src, dest):
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    font = subset.load_font(src, opts)
    cmap = font.getBestCmap()
    if NBHY not in cmap:
        for table in font['cmap'].tables:
            if table.isUnicode():
                table.cmap[NBHY] = cmap[0x2010] if 0x2010 in cmap else cmap[0x2D]
    s = subset.Subsetter(opts)
    s.populate(unicodes=UNICODES)
    s.subset(font)
    assert NBHY in font.getBestCmap() and 0x0416 in font.getBestCmap(), dest
    subset.save_font(font, dest, opts)
    print(os.path.basename(dest), os.path.getsize(dest) // 1024, 'KB')


# Начертания Hauora из стилей Figma: Regular 400, Medium 500, Bold 700, ExtraBold 800.
for w in ['Regular', 'Medium', 'Bold', 'ExtraBold']:
    build(os.path.join(hauora_dir, f'Hauora-{w}.otf'), os.path.join(out, f'hauora-{w.lower()}.woff2'))
build(unbounded_ttf, os.path.join(out, 'unbounded-variable.woff2'))
