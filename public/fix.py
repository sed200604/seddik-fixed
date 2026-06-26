import re

with open('c:/Users/star/Desktop/seddik-fixed/public/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update min-height/height vh to svh
html = html.replace('100vh', '100svh').replace('150vh', '150svh').replace('80vh', '80svh')
html = html.replace('min-height: 100svh;', 'min-height: 100vh; min-height: 100svh;')

# 2. Add html background and fix body centering
html = re.sub(
    r'body\s*\{[^}]*\}',
    '''html { background-color: #050b14; }
        body {
            margin: 0 auto;
            max-width: 480px;
            background-color: var(--navy-dark);
            color: var(--white);
            font-family: 'Cairo', sans-serif;
            font-size: clamp(15px, 1.2vw, 17px);
            line-height: 1.8;
            text-align: right;
            overflow-x: hidden;
            position: relative;
            box-shadow: 0 0 50px rgba(0,0,0,0.5);
            min-height: 100vh;
            min-height: 100svh;
        }''',
    html, count=1
)

# 3. Fix #top-chrome positioning
html = html.replace(
    '''#top-chrome {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;''',
    '''#top-chrome {
            position: fixed;
            top: 0;
            left: 50%;
            width: 100%;
            max-width: 480px;
            transform: translateX(-50%);'''
)

# 4. Fix .verdict-bar positioning
html = html.replace(
    '''position: fixed; bottom: 0; left: 0; right: 0; background: #050A12;''',
    '''position: fixed; bottom: 0; left: 50%; width: 100%; max-width: 480px; background: #050A12;'''
)
html = html.replace('transform: translateY(100%); transition: transform', 'transform: translate(-50%, 100%); transition: transform')
html = html.replace('.verdict-bar.active { transform: translateY(0); }', '.verdict-bar.active { transform: translate(-50%, 0); }')

# 5. Fix .ch14-sticky-cta positioning
html = html.replace('left: 0; right: 0; transform: translateY(150%);', 'left: 50%; width: 100%; max-width: 480px; transform: translate(-50%, 150%);')
html = html.replace('.ch14-sticky-cta.visible { transform: translateY(0); }', '.ch14-sticky-cta.visible { transform: translate(-50%, 0); }')

# 6. Change H1 to H2 for ch2 to ch14
def replace_h1(match):
    section_content = match.group(0)
    # Don't replace if it's ch1
    if re.search(r'id="ch1"', section_content):
        return section_content
    # Replace h1 with h2 inside the section
    new_content = re.sub(r'<h1([^>]*)>(.*?)</h1>', r'<h2\1>\2</h2>', section_content, flags=re.IGNORECASE | re.DOTALL)
    return new_content

html = re.sub(r'<section[^>]*>.*?</section>', replace_h1, html, flags=re.IGNORECASE | re.DOTALL)

# 7. Passive event listeners
html = re.sub(r'window\.addEventListener\(\'scroll\',\s*([^,)]+)\)', r'window.addEventListener(\'scroll\', \1, { passive: true })', html)
html = re.sub(r'window\.addEventListener\(\'resize\',\s*([^,)]+)\)', r'window.addEventListener(\'resize\', \1, { passive: true })', html)

# 8. Unobserve IntersectionObserver targets
html = html.replace(
    '''if (entry.isIntersecting) {
            entry.target.classList.add('visible');''',
    '''if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            rvObserver.unobserve(entry.target);'''
)

# 9. Add noscript tags
noscript_tag = '<noscript><style>.rv { opacity: 1 !important; transform: none !important; }</style></noscript>'
if noscript_tag not in html:
    html = html.replace('</body>', f'    {noscript_tag}\n</body>')

# Write back
with open('c:/Users/star/Desktop/seddik-fixed/public/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done!')
