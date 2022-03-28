scoreboard players operation @s temp1 = @p[tag=victim] heal_reduce
scoreboard players operation @s temp2 = @p[tag=victim] heal_reduce_lv

scoreboard players operation @s temp1 -= @s param1
scoreboard players operation @s temp2 -= @s param2

scoreboard players operation @p[tag=victim] heal_reduce = @s[scores={temp1=..-1, temp2=..0}] param1
scoreboard players operation @p[tag=victim] heal_reduce_lv = @s[scores={temp1=..-1, temp2=..0}] param2