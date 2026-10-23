(function(root){
function simulate({budget,x,y,profit,months=24}){
 if(![budget,x,y,profit,months].every(Number.isFinite)||budget<600||budget>1500||x<0||y<0||x+y>100||profit<0||months<1||months>600||!Number.isInteger(months))throw Error('Thông số không hợp lệ');
 const share=budget/2,advance=share*x/100,acceptance=share*y/100,deferred=share-advance-acceptance;
 let remaining=deferred,cumMta=advance+acceptance,cumV41=-cumMta;
 const rows=[];
 for(let month=1;month<=months;month++){
 const offset=Math.min(remaining,profit/2);remaining=Math.max(0,remaining-offset);
 const mta=profit/2+offset,v41=profit/2-offset;cumMta+=mta;cumV41+=v41;
 rows.push({month,profit,offset,mta,v41,remaining,cumMta,cumV41});
 }
 return {share,advance,acceptance,deferred,payback:deferred<1e-8?0:profit>0?Math.ceil((deferred-1e-8)/(profit/2)):null,rows};
}
if(typeof module!=='undefined')module.exports={simulate};else root.simulate=simulate;
})(globalThis);
