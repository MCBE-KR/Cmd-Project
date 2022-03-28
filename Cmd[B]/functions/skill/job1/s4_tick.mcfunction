scoreboard players operation @s temp2 = @s temp1
scoreboard players operation @s temp2 %= @e[name=config] global_ten

execute @s[scores={temp2=0}] ~ ~ ~ function skill/job1/s4_ten
scoreboard players add @s temp1 1

event entity @s[scores={temp1=81..}] cmd:despawn