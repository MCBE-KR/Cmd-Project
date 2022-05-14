tellraw @s[scores={cool1=1}] {"rawtext": [{"translate": "skill.on", "with": {"rawtext": [{"text": "1"}]}}]}
tellraw @s[scores={cool2=1}] {"rawtext": [{"translate": "skill.on", "with": {"rawtext": [{"text": "2"}]}}]}
tellraw @s[scores={cool3=1}] {"rawtext": [{"translate": "skill.on", "with": {"rawtext": [{"text": "3"}]}}]}
tellraw @s[scores={cool4=1}] {"rawtext": [{"translate": "skill.on", "with": {"rawtext": [{"text": "4"}]}}]}

scoreboard players add @s[scores={cool1=1..}] cool1 -1
scoreboard players add @s[scores={cool2=1..}] cool2 -1
scoreboard players add @s[scores={cool3=1..}] cool3 -1
scoreboard players add @s[scores={cool4=1..}] cool4 -1

execute @s[scores={cc_resist=1..}] ~ ~ ~ function buff/cc_resist
execute @s[scores={shield=1..}] ~ ~ ~ function buff/shield
execute @s[scores={stun=1..}] ~ ~ ~ function debuff/stun
execute @s[scores={heal_reduce=1..}] ~ ~ ~ function debuff/heal_reduce