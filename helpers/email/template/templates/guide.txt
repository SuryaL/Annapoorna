Because the doT documentation is not very clear:

{{~it.OrderItems :value:index}} //start iterating through this array
{{~}} //stop iterating through the array

{{? it.OrderItems[index].size !== null}} //if this condition
    {{=it.OrderItems[index].size}} //do this
{{??}} //else
    {{var c = TRUE;}}//do this
{{?}} //stop looking for this condition

{{=it.orderId}} //display exactly this data