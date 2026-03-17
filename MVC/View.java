import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionListener;

public class View extends JFrame {

    JTextField textNum1;
    JTextField textNum2;
    JLabel visor;
    JButton botao;

    public View(){

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BoxLayout(getContentPane(), BoxLayout.Y_AXIS));

        textNum1 = new JTextField(8);
        add(textNum1);

        JLabel operador = new JLabel("+");
        add(operador);

        textNum2 = new JTextField(8);
        add(textNum2);

        visor = new JLabel(" ");
        add(visor);

        botao = new JButton("Calcular");
        add(botao);

        pack();
        setVisible(true);
    }

    public String getNum1(){
        return textNum1.getText();
    }

    public String getNum2(){
        return textNum2.getText();
    }

    public void setResultado(String resultado){
        visor.setText(resultado);
    }

    public void setBotaoBehavior(ActionListener comportamento){
        botao.addActionListener(comportamento);
    }
}
