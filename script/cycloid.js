var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");

        var p = false;
        var position = 30;
        var posY = 690;
        var coordinats = Array();
        var radius = 0;
        const speed = 5;
        var circle = function(x, y, radius)
        {
            ctx.beginPath(); 
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.stroke();
    
        }
            
        function drawXAxis(ctx, canvasWidth, canvasHeight) {
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight-10 );
            ctx.lineTo(canvasWidth, canvasHeight-10);
            ctx.stroke();
        }
        function drawYAxis(ctx, canvasWidth, canvasHeight) {
            ctx.beginPath();
            ctx.moveTo(canvasWidth, 0);
            ctx.lineTo(canvasWidth, canvasHeight);
            ctx.stroke();
        }


        function shit()
        {
        
            ctx.clearRect(0,0, 2000, 700);
            position = 30;
            posY = 690;
            coordinats = Array();
            radius = parseFloat(document.getElementById("x1").value);
            koffecent = parseFloat(document.getElementById("x2").value);
            radius = radius * 50;
    
            posY = posY-radius;
            if (p==0)
            {
                setInterval(function()
                {
                    ctx.clearRect(0,0,1600,700);
                    
                    ctx.lineWidth = 3;
                    drawXAxis(ctx, 1600, 700);
                    ctx.lineWidth = 4;
                    drawYAxis(ctx, 5, 700);
                    ctx.lineWidth = 1;
                    drawXAxis(ctx, 1600, 600);
                    drawXAxis(ctx, 1600, 500);
                    drawXAxis(ctx, 1600, 400);
                    drawXAxis(ctx, 1600, 300);
                    drawXAxis(ctx, 1600, 200);
                    drawXAxis(ctx, 1600, 100);
                    var c = '03C0';
                    ctx.font = 'bold 20px sans-serif';
                    ctx.fillText("Текущий радиус окружности - " + radius/50, 15, 30);
                    ctx.fillText("Период - " + 2*radius/50 + String.fromCharCode(parseInt(c, 16)), 15, 60);
                    var radius1 = 30;
                    ctx.fillText(2, 5, 600);
                    ctx.fillText(4, 5, 500);
                    ctx.fillText(6, 5, 400);
                    ctx.fillText(8, 5, 300);
                    ctx.fillText(10, 5, 200);
                    ctx.fillText(12, 5, 100);
                    ctx.fillText(0, 9, 690);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "Bl";
                    for(let i = 0; i < 20; i++)
                    {
                        drawYAxis(ctx, i*50*3.14, 700);
                        ctx.font = 'bold 20px sans-serif';
                        
                        if(i % 3 == 0) ctx.fillText((i/3)*2 + String.fromCharCode(parseInt(c, 16)), 0+i*100, 685);
                    }
                    
                    

                    ctx.lineWidth = 2;
                    
                    circle(position, posY, radius);

                    
                    ctx.beginPath();
                    ctx.arc((position - radius*Math.sin(position/radius)), (posY+radius*Math.cos(position/radius)), 3, 0, Math.PI * 2, false);
                    ctx.stroke();

                    
                    ctx.beginPath();
                    ctx.moveTo(position, posY)
                    ctx.lineTo((position - radius*Math.sin(position/radius)), (posY+radius*Math.cos(position/radius)))
                    ctx.stroke();

                    for(let i = 0; i < koffecent; i++ )
                    {
                        coordinats.push((position + i - radius*Math.sin((position+i)/radius)))
                        coordinats.push((posY+radius*Math.cos((position+i)/radius)))
                    }
                    


                    for(let i = 0; i < coordinats.length; i+= 2)
                    {
                        ctx.fillStyle = "Red";
                        ctx.fillRect(coordinats[i],coordinats[i+1],2,2)
                        
                    }
                    ctx.fillStyle = "Black";
                    position+= koffecent;
                    if(position > 1600) 
                    { 
                        position = 30;
                        coordinats = Array();
                    }
                    }, 1)
            }
            p=1;
        }