$(document).ready(function()
{
    new WOW().init();
    w3.includeHTML();
    
    $(function () 
    {
        $("#newsTicker").bootstrapNews(
        {
            newsPerPage: 1,
            autoplay: true,
            pauseOnHover:true,
            direction: 'up',
            newsTickerInterval: 4000,
            onToDo: function () 
            {
            }
        });
    });
    
    $(function () 
    {
        $('.mdb-select').on('change', function(e)
        {
            e.preventDefault();

            if($('select').val() == 1)
            {
                $("#finalResult").fadeIn(3500).removeClass('d-none');
                $("#secondTermResult").fadeOut(3500).addClass('d-none');
            }
            else if($('select').val() == 2)
            {
                $("#secondTermResult").fadeIn(3500).removeClass('d-none');
                $("#finalResult").fadeOut(3500).addClass('d-none');
            }
        });
    });
});

$('.multi-level-dropdown .dropdown-submenu > a').on("mouseenter", function(e) 
{
    var submenu = $(this);

    $('.multi-level-dropdown .dropdown-submenu .dropdown-menu').removeClass('show');
    submenu.next('.dropdown-menu').addClass('show');
    e.stopPropagation();
});

$('.multi-level-dropdown .dropdown').on("hidden.bs.dropdown", function() 
{
    $('.multi-level-dropdown .dropdown-menu.show').removeClass('show');
});


function openNav() 
{
    document.getElementById("sideNavigation").style.width = "370px";
    document.getElementById("main").style.marginLeft = "370px";
}

function closeNav() 
{
    document.getElementById("sideNavigation").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}