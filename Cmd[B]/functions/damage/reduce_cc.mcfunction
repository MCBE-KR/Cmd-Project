#1: 10%
execute @s[scores={cc_resist_lv=1}] ~ ~ ~ scoreboard players operation @p[tag=attacker] param1 *= @e[name=config] global_nine
execute @s[scores={cc_resist_lv=1}] ~ ~ ~ scoreboard players operation @p[tag=attacker] param1 /= @e[name=config] global_ten

#2: 40%
execute @s[scores={cc_resist_lv=2}] ~ ~ ~ scoreboard players operation @p[tag=attacker] param1 *= @e[name=config] global_six
execute @s[scores={cc_resist_lv=2}] ~ ~ ~ scoreboard players operation @p[tag=attacker] param1 /= @e[name=config] global_ten

#3: 70%
execute @s[scores={cc_resist_lv=3}] ~ ~ ~ scoreboard players operation @p[tag=attacker] param1 *= @e[name=config] global_three
execute @s[scores={cc_resist_lv=3}] ~ ~ ~ scoreboard players operation @p[tag=attacker] param1 /= @e[name=config] global_ten

#4: 100%
execute @s[scores={cc_resist_lv=4}] ~ ~ ~ scoreboard players set @p[tag=attacker] param1 0