function debuff/check_cc
tellraw @s[scores={result1=0}] {"rawtext": [{"translate": "skill.fail.cc"}]}

execute @s[scores={result1=1}] ~ ~ ~ function skill/check2

scoreboard players set @s[scores={result2=0, result3=1}] temp1 0
scoreboard players set @s[scores={result2=0, result3=1}] temp2 0
scoreboard players set @s[scores={result2=0, result3=1}] temp3 0
scoreboard players operation @s[scores={result2=0, result3=1}] temp1 = @s cool2
scoreboard players operation @s[scores={result2=0, result3=1}] temp2 = @s cool2
scoreboard players operation @s[scores={result2=0, result3=1}] temp3 = @s base_cool2
scoreboard players operation @s[scores={result2=0, result3=1}] temp1 /= @e[name="config"] global_sec
scoreboard players operation @s[scores={result2=0, result3=1}] temp2 %= @e[name="config"] global_sec
scoreboard players operation @s[scores={result2=0, result3=1}] temp2 /= @e[name="config"] global_two
scoreboard players operation @s[scores={result2=0, result3=1}] temp3 /= @e[name="config"] global_sec

tellraw @s[scores={result2=0, cool2=!0}] {"rawtext": [{"translate": "skill.fail.cool", "with": {"rawtext": [{"text": "2"}, {"score": {"name": "@s", "objective": "temp1"}}, {"score": {"name": "@s", "objective": "temp2"}}, {"score": {"name": "@s", "objective": "temp3"}}]}}]}
tellraw @s[scores={result2=0, result3=2}] {"rawtext": [{"translate": "skill.fail.mana", "with": {"rawtext": [{"text": "2"}, {"score": {"name": "@s", "objective": "mana"}}, {"score": {"name": "@s", "objective": "skill2_mana"}}]}}]}

scoreboard players operation @s[scores={result1=1, result2=1}] cool2 = @s base_cool2

execute @s[scores={job=1, result1=1, result2=1}] ~ ~ ~ function skill/job1/s2
execute @s[scores={job=2, result1=1, result2=1}] ~ ~ ~ function skill/job2/s2