const $=id=>document.getElementById(id),fmt=n=>new Intl.NumberFormat('vi-VN',{maximumFractionDigits:2}).format(n),money=n=>fmt(n)+' triệu';
let result,params;
function update(source){
 let budget=Number($('budget').value),x=Number($('x').value),y=Number($('y').value),profit=Number($('profit').value),months=Number($('months').value);
 if(['budget','x','y','profit'].some(id=>$(id).value.trim()==='')||budget<600||budget>1500||x<0||x>100||y<0||y>100||profit<0||profit>1000000){$('error').textContent='Vui lòng nhập đủ thông số trong giới hạn cho phép.';return;}
 if(x+y>100){if(source==='x'){y=100-x;$('y').value=y;}else if(source==='y'){x=100-y;$('x').value=x;}}
 $('error').textContent='';$('x').max=100-y;$('y').max=100-x;
 for(const id of ['budget','x','y']){$(id+'Range').max=id==='budget'?1500:id==='x'?100-y:100-x;$(id+'Range').value=$(id).value;}
 params={budget,x,y,profit,months};result=simulate(params);
 for(const [id,val] of Object.entries({share:result.share,deferred:result.deferred,advance:result.advance,acceptance:result.acceptance,offsetLabel:result.deferred}))$(id).textContent=money(val);
 $('deferredPercent').textContent=fmt(100-x-y)+'% phần vốn V41';$('payback').textContent=result.payback===null?'Chưa xác định':result.payback===0?'Đã đủ vốn':fmt(result.payback)+' tháng';
 $('barX').style.width=x+'%';$('barY').style.width=y+'%';$('barD').style.width=(100-x-y)+'%';
 $('headline').textContent=result.deferred===0?'Chia 50/50 ngay từ tháng đầu':profit===0?'Chưa có lợi nhuận để bù vốn':`Mỗi tháng bù tối đa ${money(profit/2)}`;
 $('description').textContent=`V41 ứng ${money(result.advance)}, trả ${money(result.acceptance)} theo nghiệm thu; còn ${money(result.deferred)} bù từ quyền lợi nhuận của V41. `+(result.payback===null?'Khi phát sinh lợi nhuận dương, mô hình mới có thể bù khoản còn thiếu.':result.payback===0?'Mỗi bên nhận '+money(profit/2)+'/tháng.':`Dự kiến bù đủ trong tháng ${result.payback}; từ tháng sau, mỗi bên nhận ${money(profit/2)}/tháng. `+(result.payback>months?'Mốc này nằm ngoài khoảng bảng đang hiển thị.':''));
 $('rows').innerHTML=`<tr class="initial"><td>Ứng trước</td><td>—</td><td>${fmt(result.advance)}</td><td>—</td><td>—</td><td>—</td><td>—</td><td>${fmt(result.advance)}</td><td>${fmt(-result.advance)}</td></tr><tr class="initial"><td>Nghiệm thu</td><td>—</td><td>${fmt(result.acceptance)}</td><td>—</td><td>—</td><td>—</td><td>${fmt(result.deferred)}</td><td>${fmt(result.advance+result.acceptance)}</td><td>${fmt(-result.advance-result.acceptance)}</td></tr>`+result.rows.map(r=>`<tr class="${r.month===result.payback?'paid':''}"><td>Tháng ${r.month}${r.month===result.payback?' · Bù đủ':''}</td>${[r.profit,0,r.offset,r.mta,r.v41,r.remaining,r.cumMta,r.cumV41].map(v=>`<td>${fmt(v)}</td>`).join('')}</tr>`).join('');
}
for(const id of ['budget','x','y']){$(id).addEventListener('input',()=>update(id));$(id+'Range').addEventListener('input',()=>{$(id).value=$(id+'Range').value;update(id);});}
for(const id of ['profit','months'])$(id).addEventListener('input',()=>update(id));
document.querySelectorAll('[data-budget]').forEach(b=>b.onclick=()=>{$('budget').value=b.dataset.budget;update('budget');});
$('reset').onclick=()=>{for(const [id,v]of Object.entries({budget:1000,x:30,y:30,profit:50,months:24}))$(id).value=v;update();};
$('print').onclick=()=>window.print();
$('csv').onclick=()=>{if($('error').textContent)return;const rows=[['Mind41 — Mô phỏng V41 × MTA; đơn vị triệu đồng'],['Ngân sách',params.budget,'X (%)',params.x,'Y (%)',params.y,'LN/tháng',params.profit],['Kỳ','LN phân phối','V41 trả tiền mặt','Bù từ LN V41','MTA nhận LN','V41 nhận LN','Còn phải bù','MTA thu lũy kế','V41 ròng lũy kế'],['Ứng trước',0,result.advance,0,0,0,'',result.advance,-result.advance],['Nghiệm thu',0,result.acceptance,0,0,0,result.deferred,result.advance+result.acceptance,-result.advance-result.acceptance],...result.rows.map(r=>[r.month,r.profit,0,r.offset,r.mta,r.v41,r.remaining,r.cumMta,r.cumV41])];const blob=new Blob(['\ufeff'+rows.map(r=>r.map(v=>'"'+String(typeof v==='number'?Math.round(v*1e6)/1e6:v).replaceAll('"','""')+'"').join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='mind41-phuong-an-hop-tac.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};update();
