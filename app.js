    var MenuItems = document.getElementById("MenuItems");



    MenuItems.style.maxHeight = "0px";

    function menutoggle()
    {
        if(MenuItems.style.maxHeight == "0px")
        {
            MenuItems.style.maxHeight = "200px";

        }
        else
        {
            MenuItems.style.maxHeight = "0px";
        }
    }



    function closeCart(cart) { 
        document.getElementById(cart).style.background='transparent'; 
        document.getElementById(cart).style.visibility='hidden'; 
      
        }//closes the function close cart
    function openCart(cart) { 
        document.getElementById(cart).style.background='#fff'; 
        document.getElementById(cart).style.visibility='visible'; 
      
        }
   


