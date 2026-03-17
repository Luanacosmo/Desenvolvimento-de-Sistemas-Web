import java.awt.event.*;

public class Controller {

    private Model model;
    private View view;

    public Controller(Model m, View v){
        model = m;
        view = v;

        view.setBotaoBehavior(new BotaoBehavior());
    }

    class BotaoBehavior implements ActionListener {

        public void actionPerformed(ActionEvent e){

            String texto1 = view.getNum1();
            String texto2 = view.getNum2();

            double num1 = Double.parseDouble(texto1);
            double num2 = Double.parseDouble(texto2);

            model.setNumeros(num1, num2);
            model.calcula();

            double resultado = model.getResultado();

            view.setResultado(String.valueOf(resultado));
        }
    }
}
