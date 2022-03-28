scoreboard players operation @s result1 = @p[tag=healer] param1

#1: 20%
execute @s[scores={heal_reduce_lv=1}] ~ ~ ~ scoreboard players operation @s result1 *= @e[name=config] global_eight
execute @s[scores={heal_reduce_lv=1}] ~ ~ ~ scoreboard players operation @s result1 /= @e[name=config] global_ten

#2: 40%
execute @s[scores={heal_reduce_lv=2}] ~ ~ ~ scoreboard players operation @s result1 *= @e[name=config] global_six
execute @s[scores={heal_reduce_lv=2}] ~ ~ ~ scoreboard players operation @s result1 /= @e[name=config] global_ten

#3: 70%
execute @s[scores={heal_reduce_lv=3}] ~ ~ ~ scoreboard players operation @s result1 *= @e[name=config] global_three
execute @s[scores={heal_reduce_lv=3}] ~ ~ ~ scoreboard players operation @s result1 /= @e[name=config] global_ten