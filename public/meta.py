import re

with open('c:/Users/star/Desktop/seddik-fixed/public/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

head_additions = """
    <meta name="theme-color" content="#0A1628">
    <meta property="og:title" content="GO LLC - Survival">
    <meta property="og:description" content="GO LLC - forms real US LLCs for entrepreneurs. We don't sell formation. We sell survival.">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="ar_AR">"""

if "theme-color" not in html:
    html = html.replace('</title>', '</title>' + head_additions)

with open('c:/Users/star/Desktop/seddik-fixed/public/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Meta tags added!')
