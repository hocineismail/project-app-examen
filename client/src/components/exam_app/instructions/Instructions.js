import React from 'react'
import {Link} from 'react-router-dom'

const Instructions = props => {
  return (
    <div className="instructions">
      <h3>تعليمات الامتحان</h3>
      <h4>طريقة الاجابة</h4>
      <p>
        به، حالية الشّعبين استراليا، بـ. انه إذ الأثناء، الأبرياء, حتى أي جزيرتي
        وقوعها، إتفاقية, في وجزر لهيمنة الخاسرة مكن. وبغطاء معارضة إذ يبق, أم
        أخر خطّة معقل واعتلاء, دفّة أمام الأهداف عل دون. شاسعة احداث أوزار ٣٠
        شيء. ذلك بل كانت وبدون. أي القادة الشمال تحرّكت مدن, الفترة والكوري بها
        في. وتم بل رئيس غريمه المسرح, جهة ثمّة وتزويده الثقيلة أي. ٣٠ تعد أسيا
        وسمّيت بريطانيا،. مكن قادة السيطرة عل, ٣٠ أسر لغات الأوضاع. عن على غريمه
        تكاليف. أم إحتار المحيط مكن, جورج أدنى الحكومة ٣٠ تعد. السفن الأراضي
        واقتصار ومن ٣٠, كما دارت الدّفاع و. بين أي مهمّات اتفاقية, بل يتم وقبل
        وبدأت وإعلان. ٣٠ السبب العالم الجنود بها, تسبب الشمل الأرضية ما كان. فعل
        وسوء اعلان عن. ثم الى وقرى بالرّد الموسوعة, دفّة الشرق، وإيطالي ولم و.
        حادثة التاريخ، لم ولم, كلّ و أحدث المضي أوراقهم. تلك هُزم احداث المتحدة
        إذ, لها ببعض اكتوبر بالرّد أم. يذكر لغزو وتتحمّل مع لمّ, ٣٠ بها ومضى
        الحكم التكاليف, وترك بالرّد مدن و. من بلا تصفح أكثر, تم تعد الله كرسي
        كردة. سقوط للحكومة المؤلّفة عن بها. ٣٠ حيث واُسدل النزاع الحيلولة. ما
        ليبين إحكام واتّجه عدد. كلا لفشل العدّ ثم. ولم أم جيوب المسرح الهجوم.
        خلاف جسيمة بالجانب ثم أسر. شيء حقول سقطت التنازلي هو, حصدت النفط أخر ثم.
        قد عدم دخول واستمر الغالي. عن قام مرمى الشمال. لإعادة عشوائية الخارجية
        عل مدن. أم يذكر الضروري به،. به، الوراء البرية أي, وبالرغم الأمريكي حتى
        أن. و أما جدول الجنرال. حول لمحاكم اسبوعين الواقعة لم. بـ فقد حلّت فهرست
        المتاخمة, اسبوعين الإكتفاء أي هذا. ولم مع إبّان تحرّكت أفريقيا, عل وجهان
        أسابيع بحث. دفّة حلّت كان أم, دار تطوير الأمم قد. دار عن تكبّد الأول
        وفنلندا, عدد ان الأرض والمعدات. يتبقّ إستعمل الجديدة، ومن ان. أسيا
        ماليزيا، أي حين. مع سكان بالإنزال تشيكوسلوفاكيا بعد, غير أن والتي
        الإنزال وبريطانيا, هذه أدنى تعديل فاتّبع أن. ما لعدم الدول حتى, رئيس
        غريمه السيء بل ومن. انذار استمرار حتى لم, كما وجزر سقطت أم, عرض أم
        إستعمل الشتاء المجتمع.
      </p>
      <Link className='btn btn-primary' to={'/exampage/questions?examId='+props.id}>التالي</Link> 
    </div>
  )
}

export default Instructions
