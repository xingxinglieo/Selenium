echo "��ʼ�ݴ�"
echo "��ǰĿ¼ : %cd%"
git add -A
echo;
 
echo "��ʼ�ύ"
set now=%date% %time%
git commit -m "%now%"
echo;
 
echo "�ύ��Զ�ֿ̲�"
git push
echo;
 
echo "���"
echo;