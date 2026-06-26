import sys
import shutil

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Replace CSS
start_css = -1
end_css = -1
for i, line in enumerate(lines):
    if '/* ===== REGISTRATION FORM ===== */' in line:
        start_css = i
    if '/* ===== FOOTER ===== */' in line:
        end_css = i
        break

css_replacement = """/* ===== QUIZ FUNNEL ===== */
.quiz-wrapper {
  width: 100%;
  max-width: 540px;
  margin: 0 auto clamp(20px, 5vw, 32px);
  background: var(--card-bg);
  border: 1px solid var(--gold);
  border-radius: 12px;
  padding: clamp(24px, 6vw, 36px) clamp(20px, 5vw, 32px);
  text-align: right;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  min-height: 400px;
}
.quiz-progress-container {
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
  margin-bottom: 24px;
  overflow: hidden;
}
.quiz-progress-bar {
  height: 100%;
  background: var(--gold);
  width: 0%;
  transition: width 0.5s ease;
}
.quiz-step {
  display: none;
  animation: slideInRight 0.4s forwards;
  width: 100%;
}
.quiz-step.active {
  display: block;
}
.quiz-step.sliding-out {
  display: block;
  animation: slideOutLeft 0.4s forwards;
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideOutLeft {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-40px); }
}
.quiz-question {
  font-size: clamp(18px, 5vw, 22px);
  font-weight: 900;
  color: var(--text);
  margin-bottom: 20px;
  line-height: 1.4;
}
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.quiz-option {
  background: #0A0F1E;
  border: 1px solid #2a3550;
  border-radius: 8px;
  padding: 16px 20px;
  color: var(--text);
  font-family: 'Tajawal', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
  cursor: pointer;
  transition: all 0.3s ease;
}
.quiz-option:hover {
  border-color: var(--gold);
  background: rgba(200, 150, 12, 0.05);
}
.quiz-option.selected {
  border-color: var(--gold);
  background: rgba(200, 150, 12, 0.1);
  box-shadow: 0 0 10px rgba(200, 150, 12, 0.2);
}
.quiz-input-group {
  margin-bottom: 16px;
}
.quiz-label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-2);
  margin-bottom: 6px;
}
.quiz-input {
  width: 100%;
  height: 52px;
  background: #0A0F1E;
  color: #FFFFFF;
  border: 1px solid #2a3550;
  border-radius: 8px;
  padding: 0 16px;
  font-family: 'Tajawal', sans-serif;
  font-size: 16px;
  transition: border-color 0.3s ease;
  outline: none;
}
.quiz-input:focus {
  border-color: var(--gold);
}
.quiz-input.has-error {
  border-color: var(--danger);
}
.quiz-tel-container {
  position: relative;
  display: flex;
  align-items: center;
}
.quiz-tel-prefix {
  position: absolute;
  left: 16px;
  color: var(--text-2);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  pointer-events: none;
}
.quiz-input.input-tel {
  padding-left: 70px;
  font-family: 'Inter', sans-serif;
}
.quiz-error {
  display: none;
  color: var(--danger);
  font-size: 13px;
  font-weight: 700;
  margin-top: 6px;
}
.quiz-error.show {
  display: block;
}
.quiz-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--gold);
  color: var(--bg);
  font-family: 'Tajawal', sans-serif;
  font-weight: 900;
  font-size: 18px;
  padding: 16px 32px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.quiz-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(200,150,12,0.4);
}
.quiz-result {
  text-align: center;
}
.quiz-result-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.quiz-result-title {
  font-size: clamp(20px, 5vw, 24px);
  font-weight: 900;
  margin-bottom: 12px;
}
.quiz-result-title.success { color: var(--success); }
.quiz-result-title.warning { color: var(--gold); }
.quiz-result-desc {
  font-size: 15px;
  color: var(--text-2);
  margin-bottom: 24px;
  line-height: 1.6;
}
.mega-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--gold);
  color: var(--bg);
  font-family: 'Tajawal', sans-serif;
  font-weight: 900;
  font-size: clamp(18px, 5vw, 22px);
  padding: clamp(16px, 4vw, 20px) clamp(32px, 8vw, 60px);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  animation: soft-pulse 2s ease-in-out infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 54px;
  width: 100%;
  text-align: center;
}
.mega-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer-sweep 2.5s ease-in-out infinite;
}
.mega-cta:hover { transform: translateY(-3px); box-shadow: 0 8px 36px rgba(200,150,12,0.5); }
.mega-cta:active { transform: scale(0.96); }
@keyframes scale-in {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.trust-line {
  text-align: center;
  font-size: 13px;
  color: var(--text-2);
  margin-top: 12px;
}
"""

# 2. Replace HTML
start_html = -1
end_html = -1
for i, line in enumerate(lines):
    if '<!-- REGISTRATION FORM -->' in line:
        start_html = i
    if '<div class="urgency-bar reveal">' in line:
        end_html = i
        break

html_replacement = """    <!-- QUIZ FUNNEL -->
    <div class="quiz-wrapper reveal" id="registration-form">
      <div class="quiz-progress-container">
        <div class="quiz-progress-bar" id="quizProgress"></div>
      </div>

      <!-- Step 1 -->
      <div class="quiz-step active" id="step1">
        <h3 class="quiz-question">1. ما هو مستواك الحالي في التجارة الإلكترونية / العمل الحر؟</h3>
        <div class="quiz-options">
          <div class="quiz-option" onclick="selectOption(1, 'A')">مبتدئ تماماً</div>
          <div class="quiz-option" onclick="selectOption(1, 'B')">أعمل حالياً وأحقق بعض المبيعات</div>
          <div class="quiz-option" onclick="selectOption(1, 'C')">محترف وأريد توسيع نطاق عملي</div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="quiz-step" id="step2">
        <h3 class="quiz-question">2. ما هو هدفك الرئيسي من تأسيس شركة LLC؟</h3>
        <div class="quiz-options">
          <div class="quiz-option" onclick="selectOption(2, 'A')">فتح حسابات بنكية (Wise, Stripe)</div>
          <div class="quiz-option" onclick="selectOption(2, 'B')">الدخول للسوق الأمريكي / العالمي</div>
          <div class="quiz-option" onclick="selectOption(2, 'C')">حماية أصولي وبناء كيان قانوني</div>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="quiz-step" id="step3">
        <h3 class="quiz-question">3. هل تمتلك ميزانية تأسيس تتراوح بين 250$ إلى 400$؟</h3>
        <div class="quiz-options">
          <div class="quiz-option" onclick="selectOption(3, 'A')">نعم، الميزانية متوفرة للبدء بشكل صحيح</div>
          <div class="quiz-option" onclick="selectOption(3, 'D')">لا، أبحث عن حلول مجانية حالياً</div>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="quiz-step" id="step4">
        <h3 class="quiz-question">4. متى تخطط للبدء في التأسيس فعلياً؟</h3>
        <div class="quiz-options">
          <div class="quiz-option" onclick="selectOption(4, 'A')">فوراً / خلال هذا الأسبوع</div>
          <div class="quiz-option" onclick="selectOption(4, 'B')">خلال هذا الشهر</div>
          <div class="quiz-option" onclick="selectOption(4, 'D')">مجرد جمع معلومات، لست مستعداً بعد</div>
        </div>
      </div>

      <!-- Step 5: Lead Form -->
      <div class="quiz-step" id="step5">
        <h3 class="quiz-question" style="text-align: center;">الخطوة الأخيرة: أدخل بياناتك للحصول على النتيجة ورابط الورشة</h3>
        <div class="quiz-input-group">
          <label class="quiz-label">الاسم واللقب</label>
          <input type="text" id="quizName" class="quiz-input" placeholder="اكتب اسمك الكامل" required>
          <div class="quiz-error" id="quizNameError">⚠️ يرجى إدخال اسم صحيح</div>
        </div>
        <div class="quiz-input-group">
          <label class="quiz-label">رقم الهاتف (واتساب)</label>
          <div class="quiz-tel-container">
            <div class="quiz-tel-prefix">🇩🇿 +213</div>
            <input type="tel" id="quizPhone" class="quiz-input input-tel" placeholder="رقم هاتفك على واتساب" required dir="ltr">
          </div>
          <div class="quiz-error" id="quizPhoneError">⚠️ يرجى إدخال رقم هاتف صحيح</div>
        </div>
        <button class="mega-cta" onclick="submitQuiz()">عرض النتيجة ←</button>
        <p class="trust-line">🔒 بياناتك آمنة — لن نشاركها مع أحد</p>
      </div>

      <!-- Result: Qualified -->
      <div class="quiz-step" id="stepQualified">
        <div class="quiz-result">
          <div class="quiz-result-icon">✅</div>
          <h3 class="quiz-result-title success">تهانينا! ملفك مؤهل للانضمام</h3>
          <p class="quiz-result-desc">أنت جاهز لتأسيس شركتك باحترافية. انضم الآن إلى مجموعة الواتساب الخاصة لنرسل لك رابط الورشة المجانية.</p>
          <a href="https://chat.whatsapp.com/FwjfCJex5YiJlJCUadTABS" target="_blank" class="mega-cta">انضم لجروب الواتساب الآن ←</a>
        </div>
      </div>

      <!-- Result: Waiting -->
      <div class="quiz-step" id="stepWaiting">
        <div class="quiz-result">
          <div class="quiz-result-icon">⏳</div>
          <h3 class="quiz-result-title warning">أنت في قائمة الانتظار</h3>
          <p class="quiz-result-desc">يبدو أنك لست مستعداً تماماً للبدء حالياً. يمكنك متابعتنا على الواتساب للاستفادة من المحتوى المجاني حتى تكون جاهزاً.</p>
          <a href="https://chat.whatsapp.com/FwjfCJex5YiJlJCUadTABS" target="_blank" class="quiz-btn" style="background:#1E3A5F; color:#fff; text-decoration:none;">تابعنا على واتساب</a>
        </div>
      </div>
    </div>
"""

# 3. Replace JS
start_js = -1
end_js = -1
for i, line in enumerate(lines):
    if '// ===== FORM VALIDATION & SUBMIT =====' in line:
        start_js = i
    if '// ===== PARTICLE CANVAS =====' in line:
        end_js = i
        break

js_replacement = """  // ===== SMOOTH SCROLL FOR ALL CTAS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if(targetId === '#' || !targetId) return;
      var targetElement = document.querySelector(targetId);
      if(targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== QUIZ FUNNEL LOGIC =====
  var quizAnswers = {};
  var currentStep = 1;
  var totalSteps = 5;

  window.selectOption = function(step, answer) {
    quizAnswers['q' + step] = answer;
    
    // Highlight selected option
    var currentStepEl = document.getElementById('step' + step);
    var options = currentStepEl.querySelectorAll('.quiz-option');
    options.forEach(function(opt) { opt.classList.remove('selected'); });
    // the element clicked should be highlighted. Because event.target might be inner elements if any, we use event.currentTarget
    var e = window.event;
    if(e && e.currentTarget) {
      e.currentTarget.classList.add('selected');
    }
    
    // Wait a brief moment, then go to next step
    setTimeout(function() {
      nextStep(step + 1);
    }, 400);
  };

  function nextStep(step) {
    var oldStep = document.getElementById('step' + currentStep);
    var newStep = document.getElementById('step' + step);
    
    if(oldStep && newStep) {
      oldStep.classList.remove('active');
      oldStep.classList.add('sliding-out');
      
      setTimeout(function() {
        oldStep.classList.remove('sliding-out');
        newStep.classList.add('active');
        currentStep = step;
        updateProgress();
      }, 400);
    }
  }

  function updateProgress() {
    var progress = document.getElementById('quizProgress');
    if(!progress) return;
    var percent = ((currentStep - 1) / totalSteps) * 100;
    progress.style.width = percent + '%';
  }

  window.submitQuiz = function() {
    var nameInput = document.getElementById('quizName');
    var phoneInput = document.getElementById('quizPhone');
    var nameErr = document.getElementById('quizNameError');
    var phoneErr = document.getElementById('quizPhoneError');
    
    var isNameValid = nameInput.value.trim().length >= 3;
    var phoneVal = phoneInput.value.replace(/\D/g, '');
    var isPhoneValid = phoneVal.length >= 8 && phoneVal.length <= 15;
    
    if(!isNameValid) {
      nameInput.classList.add('has-error');
      nameErr.classList.add('show');
    } else {
      nameInput.classList.remove('has-error');
      nameErr.classList.remove('show');
    }
    
    if(!isPhoneValid) {
      phoneInput.classList.add('has-error');
      phoneErr.classList.add('show');
    } else {
      phoneInput.classList.remove('has-error');
      phoneErr.classList.remove('show');
    }
    
    if(isNameValid && isPhoneValid) {
      // Determine Result
      var isWaiting = (quizAnswers['q3'] === 'D' || quizAnswers['q4'] === 'D');
      
      var oldStep = document.getElementById('step5');
      oldStep.classList.remove('active');
      oldStep.classList.add('sliding-out');
      
      setTimeout(function() {
        oldStep.classList.remove('sliding-out');
        var progress = document.getElementById('quizProgress');
        if(progress) progress.style.width = '100%';
        
        if(isWaiting) {
          document.getElementById('stepWaiting').classList.add('active');
        } else {
          document.getElementById('stepQualified').classList.add('active');
          // Format WhatsApp Pre-filled message (optional)
          var text = "مرحباً! لقد سجلت في الورشة المجانية. اسمي: " + nameInput.value;
          var encodedText = encodeURIComponent(text);
          // Update the whatsapp link in qualified step if you want to pre-fill it
          // let aTag = document.querySelector('#stepQualified a.mega-cta');
          // aTag.href = "https://wa.me/something?text=" + encodedText; // Or just the group link
        }
      }, 400);
    }
  };

  // Clear errors on input
  var qName = document.getElementById('quizName');
  var qPhone = document.getElementById('quizPhone');
  if(qName) {
    qName.addEventListener('input', function() {
      this.classList.remove('has-error');
      document.getElementById('quizNameError').classList.remove('show');
    });
  }
  if(qPhone) {
    qPhone.addEventListener('input', function() {
      this.classList.remove('has-error');
      document.getElementById('quizPhoneError').classList.remove('show');
    });
  }

"""

new_lines = lines[:start_css] + [css_replacement + '\\n'] + lines[end_css:start_html] + [html_replacement + '\\n'] + lines[end_html:start_js] + [js_replacement + '\\n'] + lines[end_js:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

# Copy the updated index.html to public/workshop-2.html
shutil.copyfile('index.html', 'public/workshop-2.html')
