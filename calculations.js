function annuityFormula(rate,yearlyTerm,purchasePrice,depositSize){
  var pmt=0;
  var ipmt=0;
  var monthlyTerm=yearlyTerm*12;
  var monthlyRate=(rate/12);
  var loanSize=purchasePrice-depositSize;

  pmt=(monthlyRate*loanSize)/(1-Math.pow((1+monthlyRate),-1*monthlyTerm));
  ipmt=loanSize*monthlyRate;

  return [pmt,ipmt]
}


function calculateKPIs(){
  if (!document.getElementById('price-input') ||
     !document.getElementById('size-input') ||
     !document.getElementById('makler-input') ||
     !document.getElementById('tax-input') ||
     !document.getElementById('deposit-input')) {
       alert('one of input boxes is blank');
       console.log(!document.getElementById('price-input'))
     } else {

       var PurchaseCost=document.getElementById('price-result');
       var DepositSize=document.getElementById('deposit-input');
       var SizeResult=document.getElementById('size-result');
       var PaymentResult=document.getElementById('payment-result');
       var InterestResult=document.getElementById('interest-result');

       PurchaseCost.value=Math.round(document.getElementById('price-input').value*(1+
         document.getElementById('makler-input').value/100+
         document.getElementById('tax-input').value/100
       ));

       SizeResult.value=Math.round(PurchaseCost.value/document.getElementById('size-input').value);
       PaymentResult.value=Math.round(annuityFormula(0.02,30,PurchaseCost.value,DepositSize.value)[0]);
       InterestResult.value=Math.round(annuityFormula(0.02,30,PurchaseCost.value,DepositSize.value)[1]);

     }
};


document.getElementById('calculate-results').addEventListener('click', calculateKPIs);
