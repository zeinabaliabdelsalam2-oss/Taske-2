// 1. هيكلة بيانات الطالب (Class & Constructor)
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;         // مصفوفة درجات 3 مواد
    this.attendance = attendance; // نسبة الحضور
  }

  // دالة حساب المتوسط باستخدام reduce
  calculateAverage() {
    const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return sum / this.grades.length;
  }

  // دالة تحديد التقدير بالحروف
  calculateGrade() {
    const avg = this.calculateAverage();
    if (avg >= 85) return 'A';
    if (avg >= 75) return 'B';
    if (avg >= 65) return 'C';
    if (avg >= 50) return 'D';
    if (avg >= 40) return 'E';
    return 'F';
  }

  // دالة النتيجة النهائية (شرطين: المتوسط >= 50 والحضور >= 75)
  calculateStatus() {
    const avg = this.calculateAverage();
    if (avg >= 50 && this.attendance >= 75) {
      return 'ناجح';
    } else {
      return 'يحتاج مراجعة';
    }
  }
}

// 3. نظام تشغيل الجامعة (Objects Array) - 4 طلاب منهم متعثرين
const studentsList = [
  new Student(101, "أحمد محمد إبراهيم", [85, 90, 88], 90),     // طالب ممتاز
  new Student(102, "محمود علي حسن", [42, 45, 44], 82),       // متعثر (متوسطه بين 40 و 49)
  new Student(103, "سارة حسن عبد الله", [70, 75, 72], 60),    // يحتاج مراجعة (حضور ضعيف)
  new Student(104, "منة أحمد السيد", [46, 48, 45], 88)        // متعثر (متوسطه بين 40 و 49)
];

// 4. لجنة الرأفة (Array Methods)
// أ. الاستخراج: استخدام filter لاستخراج الطلاب الذين تتراوح متوسطاتهم بين 40 و 49
const strugglingStudents = studentsList.filter(student => {
  const avg = student.calculateAverage();
  return avg >= 40 && avg < 50;
});

// ب. المعالجة: استخدام map لإضافة 5 درجات رأفة لمتوسطاتهم
const adjustedStudents = strugglingStudents.map(student => {
  const oldAvg = student.calculateAverage();
  const newAvg = oldAvg + 5;
  return {
    id: student.id,
    name: student.name,
    oldAverage: oldAvg,
    newAverage: newAvg,
    status: newAvg >= 50 ? 'ناجح بعد الرأفة' : 'راسب'
  };
});

// ج. التحليل: استخدام reduce لجمع المتوسطات الجديدة بعد التعديل
const totalNewAverages = adjustedStudents.reduce((acc, student) => acc + student.newAverage, 0);

// د. متوسط الرأفة مع "درع الحماية" لمنع القسمة على صفر
const graceAverage = adjustedStudents.length > 0 
  ? totalNewAverages / adjustedStudents.length 
  : 0;

// 5. المخرجات (عرض البيانات في واجهة البرنامج بالمتصفح + طباعة Console للتأكيد)
console.log("=== 📊 تقرير أداء الطلاب العام ===");
studentsList.forEach(student => {
  console.log(`الاسم: ${student.name} | المتوسط: ${student.calculateAverage().toFixed(2)} | التقدير: ${student.calculateGrade()} | النتيجة: ${student.calculateStatus()}`);
});

console.log("\n=== 🛑 تقرير لجنة الرأفة (الطلاب المتعثرين) ===");
console.log(adjustedStudents);

console.log(`\n=== 📈 المتوسط العام للطلاب المتعثرين بعد الرأفة: ${graceAverage.toFixed(2)} ===`);


// === كود ربط البيانات بـ واجهة المستخدم (UI) لتظهر كبرنامج حقيقي ===
document.addEventListener("DOMContentLoaded", () => {
  // 1. تعبئة جدول الطلاب العام
  const tableBody = document.getElementById("studentsTableBody");
  studentsList.forEach(student => {
    const avg = student.calculateAverage();
    const grade = student.calculateGrade();
    const status = student.calculateStatus();
    
    const row = document.createElement("tr");
    row.className = "border-b border-slate-700 hover:bg-slate-700/50 transition";
    row.innerHTML = `
      <td class="py-3 px-4 text-cyan-400 font-mono">${student.id}</td>
      <td class="py-3 px-4 font-medium">${student.name}</td>
      <td class="py-3 px-4">${avg.toFixed(2)}</td>
      <td class="py-3 px-4 font-bold text-amber-300">${grade}</td>
      <td class="py-3 px-4">${student.attendance}%</td>
      <td class="py-3 px-4">
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${status === 'ناجح' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}">
          ${status}
        </span>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // 2. تعبئة بيانات لجنة الرأفة
  const graceContainer = document.getElementById("graceContainer");
  if (adjustedStudents.length === 0) {
    graceContainer.innerHTML = `<p class="text-slate-400">لا يوجد طلاب متعثرين حالياً.</p>`;
  } else {
    adjustedStudents.forEach(item => {
      const card = document.createElement("div");
      card.className = "bg-slate-900/60 p-4 rounded-lg border border-slate-700 flex justify-between items-center";
      card.innerHTML = `
        <div>
          <h4 class="font-bold text-slate-200">${item.name}</h4>
          <p class="text-xs text-slate-400 mt-1">المتوسط قبل الرأفة: <span class="text-amber-400">${item.oldAverage.toFixed(2)}</span> &larr; بعد الرأفة (+5): <span class="text-emerald-400 font-bold">${item.newAverage.toFixed(2)}</span></p>
        </div>
        <span class="px-3 py-1 rounded text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">${item.status}</span>
      `;
      graceContainer.appendChild(card);
    });
  }

  // 3. عرض العدد ومتوسط الرأفة
  document.getElementById("strugglingCount").textContent = adjustedStudents.length;
  document.getElementById("graceAverageDisplay").textContent = graceAverage.toFixed(2);
});